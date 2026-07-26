// @vitest-environment happy-dom
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('../src/lib/define-custom-elements.js', () => ({
  defineCustomElement() {
    if (!customElements.get('revo-grid')) {
      customElements.define(
        'revo-grid',
        class RevoGridElement extends HTMLElement {
          connectedCallback() {
            this.dispatchEvent(
              new CustomEvent('created', {
                detail: { ready: true },
              }),
            );
          }
        },
      );
    }
  },
}));

const { default: RevoGrid } = await import(
  '../src/lib/components/RevoGrid.react.js'
);

let container;
let root;

afterEach(async () => {
  if (root) {
    await act(async () => root.unmount());
  }
  container?.remove();
  container = undefined;
  root = undefined;
});

async function render(props) {
  if (!root) {
    container = document.createElement('div');
    document.body.append(container);
    root = createRoot(container);
  }
  await act(async () => {
    root.render(React.createElement(RevoGrid, props));
  });
  return container.querySelector('revo-grid');
}

describe('RevoGrid Dash bridge', () => {
  it('captures lifecycle events emitted when the element connects', async () => {
    const setProps = vi.fn();
    await render({
      eventListeners: ['created'],
      setProps,
    });
    expect(setProps).toHaveBeenCalledTimes(1);
    expect(setProps.mock.calls[0][0].eventData).toMatchObject({
      name: 'created',
      detail: { ready: true },
      sequence: 1,
    });
    expect(setProps.mock.calls[0][0].created).toEqual(
      setProps.mock.calls[0][0].eventData,
    );
  });

  it('assigns grid props and emits compact repeated edit events', async () => {
    const setProps = vi.fn();
    const source = [{ name: 'Ada' }];
    const element = await render({
      source,
      columns: [{ prop: 'name' }],
      setProps,
    });
    expect(element.source).toBe(source);

    const detail = {
      rowIndex: 0,
      colIndex: 0,
      prop: 'name',
      val: 'Grace',
      type: 'rgRow',
      colType: 'rgCol',
      model: { name: 'Grace', extra: true },
    };
    element.dispatchEvent(new CustomEvent('afteredit', { detail }));
    element.dispatchEvent(new CustomEvent('afteredit', { detail }));

    expect(setProps).toHaveBeenCalledTimes(2);
    expect(setProps.mock.calls[0][0]).not.toHaveProperty('source');
    expect(setProps.mock.calls[0][0].afteredit.detail).not.toHaveProperty(
      'model',
    );
    expect(setProps.mock.calls[0][0].afteredit.sequence).toBe(1);
    expect(setProps.mock.calls[1][0].afteredit.sequence).toBe(2);
  });

  it('syncs source only when enabled and cleans generic listeners', async () => {
    const setProps = vi.fn();
    const element = await render({
      source: [{ name: 'Ada' }],
      eventListeners: ['created'],
      syncSourceOnEdit: true,
      setProps,
    });
    element.source[0].name = 'Grace';
    element.dispatchEvent(
      new CustomEvent('afteredit', {
        detail: {
          rowIndex: 0,
          prop: 'name',
          val: 'Grace',
          type: 'rgRow',
        },
      }),
    );
    expect(setProps.mock.calls.at(-1)[0].source).toEqual([{ name: 'Grace' }]);
    expect(setProps.mock.calls.at(-1)[0].source).not.toBe(element.source);

    await render({
      source: element.source,
      eventListeners: ['runtimepluginchange'],
      syncSourceOnEdit: true,
      setProps,
    });
    setProps.mockClear();
    element.dispatchEvent(new CustomEvent('created', { detail: {} }));
    element.dispatchEvent(
      new CustomEvent('runtimepluginchange', { detail: { ready: true } }),
    );
    expect(setProps).toHaveBeenCalledTimes(1);
    expect(setProps.mock.calls[0][0].eventData.name).toBe(
      'runtimepluginchange',
    );
    expect(setProps.mock.calls[0][0]).not.toHaveProperty(
      'runtimepluginchange',
    );
  });
});
