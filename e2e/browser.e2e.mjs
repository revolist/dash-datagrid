import { test, expect } from '@playwright/test';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

let server;
let serverOutput = '';
let baseUrl;

function findPort() {
  return new Promise((resolve, reject) => {
    const listener = net.createServer();
    listener.on('error', reject);
    listener.listen(0, '127.0.0.1', () => {
      const address = listener.address();
      listener.close(() => resolve(address.port));
    });
  });
}

async function waitForServer(url) {
  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // The Dash server is still starting.
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error(`Dash server did not start.\n${serverOutput}`);
}

test.beforeAll(async () => {
  const port = await findPort();
  baseUrl = `http://127.0.0.1:${port}`;
  const virtualEnvPython = path.join(packageRoot, '.venv/bin/python');
  const python = fs.existsSync(virtualEnvPython)
    ? virtualEnvPython
    : process.env.DASH_PYTHON || 'python';
  server = spawn(python, ['tests/browser_app.py'], {
    cwd: packageRoot,
    env: {
      ...process.env,
      DASH_TEST_PORT: String(port),
      PYTHONPATH: packageRoot,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  server.stdout.on('data', chunk => {
    serverOutput += chunk;
  });
  server.stderr.on('data', chunk => {
    serverOutput += chunk;
  });
  await waitForServer(baseUrl);
});

test.afterAll(() => {
  server?.kill('SIGTERM');
});

async function dispatchGridEvent(page, name, detail) {
  await page.locator('revo-grid').evaluate(
    (element, event) => {
      element.dispatchEvent(
        new CustomEvent(event.name, { detail: event.detail }),
      );
    },
    { name, detail },
  );
}

const dedicatedEvents = new Set([
  'afteredit',
  'afterfocus',
  'headerclick',
  'roworderchanged',
  'aftersortingapply',
  'beforefilterapply',
  'aftercolumnresize',
]);

function eventLocator(page, name) {
  const property = dedicatedEvents.has(name) ? name : 'eventData';
  return page.locator(`#event-${property}`);
}

async function currentEvent(page, name) {
  const text = await eventLocator(page, name).textContent();
  return !text || text === 'waiting' ? null : JSON.parse(text);
}

async function expectEvent(page, name, afterSequence = 0) {
  await expect
    .poll(async () => {
      const event = await currentEvent(page, name);
      return event &&
        event.name === name &&
        event.sequence > afterSequence
        ? event.name
        : null;
    })
    .toBe(name);
  return currentEvent(page, name);
}

async function openGrid(page) {
  await page.goto(baseUrl);
  const grid = page.locator('revo-grid');
  await expect(grid).toBeVisible();
  await expect
    .poll(() =>
      grid.evaluate(async element => {
        const rows = await element.getVisibleSource();
        return rows.length;
      }),
    )
    .toBeGreaterThan(0);
  await expect(
    page.locator(
      'revo-grid revogr-viewport-scroll.rgCol:not([row-header]) ' +
        '[data-rgRow="0"][data-rgCol="0"]',
    ),
  ).toBeVisible();
  return grid;
}

test('renders, accepts Python updates, and reports cell and range edits', async ({
  page,
}) => {
  const grid = await openGrid(page);
  await expect.poll(() => grid.evaluate(element => element.source.length)).toBe(
    1,
  );

  await page.locator('#replace').click();
  await expect.poll(() => grid.evaluate(element => element.source.length)).toBe(
    2,
  );
  await page
    .locator(
      'revo-grid revogr-viewport-scroll.rgCol:not([row-header]) ' +
        '[data-rgRow="0"][data-rgCol="0"]',
    )
    .dblclick();
  const editInput = page.locator('revo-grid revogr-edit input');
  await expect(editInput).toBeVisible();
  await editInput.fill('Katherine');
  await editInput.press('Tab');
  const afterEdit = await expectEvent(page, 'afteredit');
  expect(afterEdit.detail).toMatchObject({
    colIndex: 0,
    colType: 'rgCol',
    prop: 'name',
    rowIndex: 0,
    type: 'rgRow',
    val: 'Katherine',
  });
  expect(afterEdit.detail).not.toHaveProperty('model');
  await expect
    .poll(() => grid.evaluate(element => element.source[0].name))
    .toBe('Katherine');

  await grid.evaluate(element =>
    element.setCellsFocus({ x: 0, y: 0 }, { x: 1, y: 1 }),
  );
  await expect
    .poll(() => grid.evaluate(element => element.getSelectedRange()))
    .toMatchObject({
      x: 0,
      y: 0,
      x1: 1,
      y1: 1,
    });
  await page.evaluate(text => {
    class DataTransferStub {
      data = {};
      types = [];

      setData(type, value) {
        this.data[type] = value;
        if (type === 'text/plain') {
          this.data.text = value;
        }
        if (type === 'text') {
          this.data['text/plain'] = value;
        }
        if (!this.types.includes(type)) {
          this.types.push(type);
        }
        if (type === 'text/plain' && !this.types.includes('text')) {
          this.types.push('text');
        }
      }

      getData(type) {
        if (type === 'text') {
          return this.data.text ?? this.data['text/plain'] ?? '';
        }
        if (type === 'text/plain') {
          return this.data['text/plain'] ?? this.data.text ?? '';
        }
        return this.data[type] ?? '';
      }
    }

    const event = new Event('paste', {
      bubbles: true,
      cancelable: true,
    });
    const clipboardData = new DataTransferStub();
    clipboardData.setData('text/plain', text);
    Object.defineProperty(event, 'clipboardData', {
      value: clipboardData,
      configurable: true,
    });
    document.dispatchEvent(event);
  }, 'Nia\t11\nOla\t22');
  const rangeEdit = await expectEvent(
    page,
    'afteredit',
    afterEdit.sequence,
  );
  expect(rangeEdit.detail).toHaveProperty('data');
  await expect
    .poll(() => grid.evaluate(element => element.source))
    .toEqual([
      { name: 'Nia', score: '11' },
      { name: 'Ola', score: '22' },
    ]);
});

test('bridges focus, sorting, filtering, and resize callbacks', async ({
  page,
}) => {
  const grid = await openGrid(page);
  await page
    .locator(
      'revo-grid revogr-viewport-scroll.rgCol:not([row-header]) ' +
        '[data-rgRow="0"][data-rgCol="0"]',
    )
    .click();
  await expectEvent(page, 'afterfocus');

  const nameHeader = page
    .locator('revo-grid revogr-header .rgHeaderCell')
    .filter({ hasText: 'Name' });
  await nameHeader.click();
  await expectEvent(page, 'aftersortingapply');

  await nameHeader.hover();
  await nameHeader.locator('.rv-filter').click({ force: true });
  const filterPanel = page.locator('revogr-filter-panel dialog');
  await expect(filterPanel).toBeVisible();
  await filterPanel.getByRole('combobox').selectOption({ label: 'Contains' });
  const filterInput = page.locator(
    'revogr-filter-panel dialog input[placeholder="Enter value..."]',
  );
  await expect(filterInput).toBeVisible();
  await filterInput.fill('Ada');
  await expectEvent(page, 'beforefilterapply');
  await page.keyboard.press('Escape');

  const resizeHandle = nameHeader.locator('.resizable-r');
  const handleBox = await resizeHandle.boundingBox();
  expect(handleBox).not.toBeNull();
  await page.mouse.move(
    handleBox.x + handleBox.width / 2,
    handleBox.y + handleBox.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    handleBox.x + handleBox.width / 2 + 35,
    handleBox.y + handleBox.height / 2,
    { steps: 8 },
  );
  await page.mouse.up();
  await expectEvent(page, 'aftercolumnresize');

  await dispatchGridEvent(page, 'headerclick', { prop: 'name' });
  await expectEvent(page, 'headerclick');
  await dispatchGridEvent(page, 'roworderchanged', { from: 0, to: 1 });
  await expectEvent(page, 'roworderchanged');
});

test('updates generic listeners and removes stale listeners', async ({
  page,
}) => {
  await openGrid(page);
  const initialCreated = await expectEvent(page, 'created');
  await dispatchGridEvent(page, 'created', { ready: true });
  await expectEvent(page, 'created', initialCreated.sequence);
  await page.locator('#switch-listener').click();
  await page.waitForTimeout(100);
  const genericEvent = eventLocator(page, 'created');
  const eventBeforeOldListener = await genericEvent.textContent();
  await dispatchGridEvent(page, 'created', { shouldNotPublish: true });
  await page.waitForTimeout(100);
  expect(await genericEvent.textContent()).toBe(eventBeforeOldListener);
  await dispatchGridEvent(page, 'contentsizechanged', { width: 500 });
  await expectEvent(page, 'contentsizechanged');
});

test('does not transmit a large source during default edits', async ({
  page,
}) => {
  const grid = await openGrid(page);
  await page.locator('#load-large').click();
  await expect
    .poll(() => grid.evaluate(element => element.source.length), {
      timeout: 15_000,
    })
    .toBe(10_000);

  const editRequests = [];
  page.on('request', request => {
    if (
      request.method() === 'POST' &&
      request.url().includes('/_dash-update-component')
    ) {
      const body = request.postData();
      if (body?.includes('"afteredit"')) {
        editRequests.push(body);
      }
    }
  });

  await page
    .locator(
      'revo-grid revogr-viewport-scroll.rgCol:not([row-header]) ' +
        '[data-rgRow="0"][data-rgCol="0"]',
    )
    .dblclick();
  const editInput = page.locator('revo-grid revogr-edit input');
  await editInput.fill('Edited');
  await editInput.press('Tab');
  const event = await expectEvent(page, 'afteredit');
  expect(event.detail).toMatchObject({
    prop: 'name',
    rowIndex: 0,
    val: 'Edited',
  });
  await expect.poll(() => editRequests.length).toBeGreaterThan(0);
  expect(Math.max(...editRequests.map(body => body.length))).toBeLessThan(
    20_000,
  );
  expect(editRequests.every(body => !body.includes('"Row 9999"'))).toBe(true);
  await expect
    .poll(() => grid.evaluate(element => element.source.length))
    .toBe(10_000);
});
