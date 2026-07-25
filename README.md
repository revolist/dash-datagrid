<p align="center">
  <a href="https://rv-grid.com/guide/dash/">
    <img src="https://raw.githubusercontent.com/revolist/revogrid/main/assets/logo.svg" alt="RevoGrid Data Grid for Plotly Dash" height="150" />
  </a>
</p>

<p align="center">
  <a href="https://pypi.org/project/dash-datagrid/"><img src="https://img.shields.io/pypi/v/dash-datagrid" alt="Latest version on PyPI"/></a>
  <a href="https://pypi.org/project/dash-datagrid/"><img src="https://img.shields.io/pypi/pyversions/dash-datagrid" alt="Supported Python versions"/></a>
  <a href="https://github.com/revolist/dash-datagrid/blob/main/LICENSE"><img src="https://img.shields.io/pypi/l/dash-datagrid" alt="Software license"/></a>
  <a href="https://www.npmjs.com/package/@revolist/dash-datagrid"><img src="https://img.shields.io/npm/v/@revolist/dash-datagrid" alt="Latest version on npm"/></a>
  <a href="https://github.com/revolist/dash-datagrid/actions/workflows/ci.yml"><img src="https://github.com/revolist/dash-datagrid/actions/workflows/ci.yml/badge.svg" alt="CI workflow status"/></a>
</p>

<h3 align="center">Powerful data grid component for <a href="https://dash.plotly.com/">Plotly Dash</a>, powered by RevoGrid.</h3>
<p align="center">
Render 1M+ rows, millions of cells, and thousands of columns efficiently with no hard row limit in the grid.
</p>
<p align="center">
Used by some of the largest companies in Europe and the United States.
</p>

<p align="center">
  <a href="https://rv-grid.com/guide/dash/">Docs</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#common-configuration">Configuration</a> •
  <a href="#dash-callbacks-and-revogrid-events">Events</a> •
  <a href="https://rv-grid.com/guide/api/revoGrid">RevoGrid API</a> •
  <a href="./LICENSE">License</a>
</p>

<img src="https://raw.githubusercontent.com/revolist/revogrid/main/assets/material.jpg" alt="RevoGrid material theme data grid preview" width="100%" />
<i>RevoGrid material theme.</i>
<br>

# Dash DataGrid

`dash-datagrid` is the official RevoGrid Core component for
[Plotly Dash](https://dash.plotly.com/). It combines RevoGrid's virtualized
custom element with a generated, typed Python class.

- PyPI package: `dash-datagrid`
- Python import: `dash_datagrid`
- Python component: `dash_datagrid.RevoGrid`
- npm package: `@revolist/dash-datagrid`
- Full documentation: [Dash Data Grid](https://rv-grid.com/guide/dash/)
- Core API: [RevoGrid API](https://rv-grid.com/guide/api/revoGrid)
- Events: [RevoGrid Events API](https://rv-grid.com/guide/api/events)

The Python package includes the JavaScript bundle and source map. Normal Dash
applications do not need to install the npm package separately.

## Compatibility and scope

- Python 3.10 or newer
- Dash 3.x or 4.x
- RevoGrid Core at the same version as `dash-datagrid`

Version 1 supports the JSON-safe RevoGrid Core property surface and server-side
Dash callbacks. Pro and Enterprise plugin activation, custom JavaScript
renderers/editors, imperative grid methods, and synchronous browser-event
cancellation are outside its scope.

## Getting started

### Install

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install dash-datagrid
```

On Windows PowerShell:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install dash-datagrid
```

### Create a grid

Save this as `app.py`:

```python
from dash import Dash, Input, Output, callback, html
from dash_datagrid import RevoGrid


app = Dash(__name__)

app.layout = html.Main(
    [
        html.H1("Orders"),
        RevoGrid(
            id="orders-grid",
            columns=[
                {
                    "prop": "order",
                    "name": "Order",
                    "readonly": True,
                    "size": 130,
                },
                {
                    "prop": "customer",
                    "name": "Customer",
                    "sortable": True,
                    "size": 180,
                },
                {
                    "prop": "amount",
                    "name": "Amount",
                    "sortable": True,
                    "filter": "number",
                },
            ],
            source=[
                {"order": "A-100", "customer": "Ada", "amount": 120},
                {"order": "A-101", "customer": "Grace", "amount": 85},
                {"order": "A-102", "customer": "Linus", "amount": 210},
            ],
            rowHeaders=True,
            resize=True,
            range=True,
            filter=True,
            style={"height": 420},
        ),
        html.Pre("Edit a cell to see its event.", id="edit-output"),
    ]
)


@callback(
    Output("edit-output", "children"),
    Input("orders-grid", "afteredit"),
    prevent_initial_call=True,
)
def show_edit(event):
    detail = event["detail"]
    if "prop" not in detail:
        return f"Range edit: {detail}"
    return (
        f'Row {detail["rowIndex"]}, {detail["prop"]} '
        f'changed to {detail["val"]!r}'
    )


if __name__ == "__main__":
    app.run(debug=True)
```

Run it:

```bash
python app.py
```

Then open the local URL printed by Dash, normally
`http://127.0.0.1:8050`.

Each column `prop` selects a key from every source row. Give the component an
explicit height through `style`; RevoGrid fills that host height.

## Loading data

`source`, `pinnedTopSource`, and `pinnedBottomSource` accept lists of
JSON-serializable row dictionaries:

```python
rows = [
    {"id": 1, "product": "Keyboard", "price": 95.0},
    {"id": 2, "product": "Mouse", "price": 35.5},
]
```

Use strings, finite numbers, booleans, `None`, lists, and dictionaries made
from those values. Normalize `datetime`, `Decimal`, NumPy scalar, UUID, and
other Python-specific values before assigning them to a component prop.

See [Data & Rows](https://rv-grid.com/guide/row) and
[Data Source Loading and Syncing](https://rv-grid.com/guide/data-sync).

### pandas DataFrames

For a DataFrame that already contains JSON-native values:

```python
rows = frame.to_dict("records")

grid = RevoGrid(
    columns=columns,
    source=rows,
    style={"height": 420},
)
```

For timestamps, missing values, NumPy values, or mixed DataFrames, normalize
through JSON:

```python
import json

rows = json.loads(
    frame.to_json(
        orient="records",
        date_format="iso",
    )
)
```

The JSON round trip converts timestamps to ISO strings and missing values to
`None`-compatible JSON `null`.

### Python-driven source changes

Return a new `source` when the application intentionally loads a different
dataset:

```python
from dash import Input, Output, callback


@callback(
    Output("orders-grid", "source"),
    Input("reload-orders", "n_clicks"),
    prevent_initial_call=True,
)
def reload_orders(_clicks):
    return load_orders_from_database()
```

Full replacement is appropriate for a reload, search, page change, or server
refresh. Normal cell edits should usually use the compact `afteredit` delta
instead.

## Configuring columns

Columns are plain dictionaries. The most common JSON-safe fields are:

| Field | Purpose |
| --- | --- |
| `prop` | Required row key |
| `name` | Header label |
| `size`, `minSize`, `maxSize` | Width constraints in pixels |
| `readonly` | Disable editing for this column |
| `sortable`, `order` | Enable sorting and set `asc` or `desc` order |
| `filter` | Enable a built-in filter family |
| `pin` | Use `colPinStart` or `colPinEnd` |
| `rowDrag` | Add a row-drag handle |
| `columnType` | Use a preset from `columnTypes` |

```python
columns = [
    {
        "prop": "id",
        "name": "ID",
        "readonly": True,
        "pin": "colPinStart",
        "size": 90,
    },
    {
        "prop": "customer",
        "name": "Customer",
        "sortable": True,
        "minSize": 140,
    },
    {
        "prop": "amount",
        "name": "Amount",
        "sortable": True,
        "filter": "number",
        "order": "desc",
    },
]
```

Column groups also use plain objects:

```python
columns = [
    {
        "name": "Customer",
        "children": [
            {"prop": "first_name", "name": "First name"},
            {"prop": "last_name", "name": "Last name"},
        ],
    },
    {
        "name": "Order",
        "children": [
            {"prop": "status", "name": "Status"},
            {"prop": "amount", "name": "Amount", "filter": "number"},
        ],
    },
]
```

Function-valued column members are not supported. This includes
`cellTemplate`, `columnTemplate`, `cellProperties`, `columnProperties`,
`cellCompare`, `cellParser`, constructor-based `editor` values, function-based
`readonly`, and function-based `rowDrag`.

References:

- [Column Configuration](https://rv-grid.com/guide/column)
- [Column Properties](https://rv-grid.com/guide/column/properties)
- [`ColumnRegular` API](https://rv-grid.com/guide/types/Interface.ColumnRegular)
- [`ColumnGrouping` API](https://rv-grid.com/guide/types/Interface.ColumnGrouping)
- [Column Grouping](https://rv-grid.com/guide/column/grouping)

### Reusable column types

`columnTypes` accepts JSON-safe column presets:

```python
grid = RevoGrid(
    columnTypes={
        "identifier": {"readonly": True, "size": 120},
        "money": {"size": 140, "sortable": True, "filter": "number"},
    },
    columns=[
        {"prop": "id", "name": "ID", "columnType": "identifier"},
        {"prop": "amount", "name": "Amount", "columnType": "money"},
    ],
    source=rows,
    style={"height": 420},
)
```

See [Column Types and Formats](https://rv-grid.com/guide/column/types).

## Common configuration

### Editing, range selection, and clipboard

```python
grid = RevoGrid(
    source=rows,
    columns=columns,
    readonly=False,
    range=True,
    useClipboard={"rangeFill": True},
    applyOnClose=True,
    style={"height": 420},
)
```

- `readonly=True` makes the complete grid read-only.
- A column-level `readonly=True` locks only that column.
- `range=True` enables multi-cell selection.
- `useClipboard=True` enables the built-in copy/paste behavior.
- `rangeFill` requires range selection.

References:

- [Editing](https://rv-grid.com/guide/editing)
- [Clipboard](https://rv-grid.com/guide/clipboard)
- [`ClipboardConfig`](https://rv-grid.com/guide/types/Interface.ClipboardConfig)
- [Selection API](https://rv-grid.com/guide/api/selectionFocus)

### Filtering and sorting

```python
grid = RevoGrid(
    filter={
        "collection": {
            "status": {"type": "eq", "value": "Open"},
        }
    },
    sorting={
        "columns": [
            {"prop": "amount", "order": "desc"},
        ],
        "additive": False,
    },
    columns=[
        {"prop": "status", "name": "Status", "filter": "string"},
        {
            "prop": "amount",
            "name": "Amount",
            "filter": "number",
            "sortable": True,
        },
    ],
    source=rows,
    style={"height": 420},
)
```

Custom filter functions and custom sorting comparators require JavaScript and
are not supported through Python in v1.

References:

- [Filtering](https://rv-grid.com/guide/filters)
- [`ColumnFilterConfig`](https://rv-grid.com/guide/types/Interface.ColumnFilterConfig)
- [Sorting](https://rv-grid.com/guide/sorting)
- [`SortingConfig`](https://rv-grid.com/guide/types/TypeAlias.SortingConfig)

### Row grouping

```python
grid = RevoGrid(
    grouping={
        "props": ["region", "team"],
        "expandedAll": True,
        "preserveGroupingOnUpdate": True,
    },
    columns=columns,
    source=rows,
    style={"height": 420},
)
```

`groupLabelTemplate` and `getGroupValue` are functions and cannot cross the
Python boundary.

References:

- [Row Grouping](https://rv-grid.com/guide/row/grouping)
- [`GroupingOptions`](https://rv-grid.com/guide/types/TypeAlias.GroupingOptions)

### Sizing and pinned data

```python
grid = RevoGrid(
    colSize=120,
    rowSize=34,
    rowHeaders={"size": 56},
    resize=True,
    autoSizeColumn=True,
    stretch="last",
    canMoveColumns=True,
    pinnedTopSource=[{"name": "Current selection"}],
    pinnedBottomSource=[{"name": "Total"}],
    columns=columns,
    source=rows,
    style={"height": 500},
)
```

References:

- [Grid Size](https://rv-grid.com/guide/grid.size)
- [Column Autosize](https://rv-grid.com/guide/column/autosize)
- [Column Resize](https://rv-grid.com/guide/column/resize)
- [Column Stretch](https://rv-grid.com/guide/column/stretch)
- [Column Ordering](https://rv-grid.com/guide/column/order)
- [Row Headers](https://rv-grid.com/guide/row/headers)
- [Pinned Rows](https://rv-grid.com/guide/row/pin)

## Dash callbacks and RevoGrid events

### Dedicated event properties

Seven common event paths have dedicated Dash input properties:

| Dash property | When it updates | Typical `detail` | Core API |
| --- | --- | --- | --- |
| `afteredit` | A cell or selected range changes | Compact delta or range data | [`AfterEditEvent`](https://rv-grid.com/guide/types/TypeAlias.AfterEditEvent) |
| `afterfocus` | Focus rendering completes | Focused cell/range | [`FocusAfterRenderEvent`](https://rv-grid.com/guide/types/Interface.FocusAfterRenderEvent) |
| `headerclick` | A header is clicked | JSON-safe column definition | [`ColumnRegular`](https://rv-grid.com/guide/types/Interface.ColumnRegular) |
| `roworderchanged` | A row reorder is requested | `from`, `to` | [Row Drag and Drop](https://rv-grid.com/guide/row/order) |
| `aftersortingapply` | Sorting finishes | Final sorting state | [`AfterSortingApplyEvent`](https://rv-grid.com/guide/types/TypeAlias.AfterSortingApplyEvent) |
| `beforefilterapply` | Filtering is about to apply | Filter `collection` | [Filtering Events](https://rv-grid.com/guide/filters#event-hooks) |
| `aftercolumnresize` | Column resizing finishes | Resized columns by index | [Column Resize](https://rv-grid.com/guide/column/resize) |

Every dedicated and generic callback value has this envelope:

```json
{
  "name": "afteredit",
  "detail": {
    "rowIndex": 0,
    "colIndex": 2,
    "prop": "amount",
    "val": 140,
    "type": "rgRow",
    "colType": "rgCol"
  },
  "timestamp": 1784980000000,
  "sequence": 1
}
```

- `name` is the lowercase RevoGrid DOM event name.
- `detail` is the JSON-safe event payload.
- `timestamp` is the browser time in Unix milliseconds.
- `sequence` increments for every event, so identical consecutive payloads
  still update Dash.

For a single-cell edit, `afteredit.detail` keeps `rowIndex`, `colIndex`, `prop`,
`val` or `value`, `type`, and `colType`. For a range edit, it keeps `data`,
`newRange`, `oldRange`, and `type`. Large grid-owned models and collections are
removed.

```python
from dash import Input, Output, callback


@callback(
    Output("edit-summary", "children"),
    Input("orders-grid", "afteredit"),
    prevent_initial_call=True,
)
def show_edit(event):
    detail = event["detail"]
    if "prop" in detail:
        return f'{detail["prop"]} changed to {detail["val"]!r}'
    return f"Range edit: {detail}"
```

When a callback has several event inputs, use `dash.ctx.triggered_id` or
`dash.ctx.triggered_prop_ids` to identify the triggering property.

### Subscribe to other events

Set `eventListeners` to Core event names and read `eventData`:

```python
grid = RevoGrid(
    id="orders-grid",
    eventListeners=[
        "aftergridinit",
        "filterconfigchanged",
        "sortingconfigchanged",
    ],
    columns=columns,
    source=rows,
    style={"height": 420},
)


@callback(
    Output("event-log", "children"),
    Input("orders-grid", "eventData"),
    prevent_initial_call=True,
)
def show_event(event):
    return f'{event["sequence"]}: {event["name"]}'
```

Names are deduplicated and listeners are reconciled when `eventListeners`
changes. A dedicated name is ignored in `eventListeners` because its dedicated
property already receives it.

Avoid high-frequency events such as `viewportscroll` unless a server request
for every event is intentional.

Use the [complete Events API](https://rv-grid.com/guide/api/events) to choose
event names and [Event Patterns](https://rv-grid.com/guide/events-guide) to
understand their lifecycle.

### Event serialization

Before calling Dash `setProps`, the bridge makes event details JSON safe:

- strings, finite numbers, booleans, `null`, arrays, and plain objects remain;
- JavaScript dates become ISO strings;
- non-finite numbers, cycles, DOM nodes, and class instances become `null`;
- function, symbol, and `undefined` object fields are omitted;
- unsupported array entries become `null`.

## Edit synchronization

### Default: compact deltas

`syncSourceOnEdit=False` is the default. The browser applies the edit and sends
only the compact `afteredit` envelope to Python:

```text
edit in browser -> compact afteredit envelope -> Dash callback
```

This avoids cloning or transmitting the complete source and is recommended for
large datasets, autosave APIs, patch queues, and audit logs.

```python
@callback(
    Output("save-status", "children"),
    Input("orders-grid", "afteredit"),
    prevent_initial_call=True,
)
def persist_edit(event):
    detail = event["detail"]
    if "prop" not in detail:
        return "A range edit was received"

    save_cell_change(
        row_index=detail["rowIndex"],
        field=detail["prop"],
        value=detail["val"],
    )
    return f'Saved row {detail["rowIndex"]}'
```

`save_cell_change` represents your persistence layer. For multi-user data,
include a stable identifier in every source row and map the reported row index
to that identifier.

### Opt in to full source synchronization

Set `syncSourceOnEdit=True` only when a callback needs the complete updated
source:

```python
grid = RevoGrid(
    id="orders-grid",
    syncSourceOnEdit=True,
    columns=columns,
    source=rows,
    style={"height": 420},
)


@callback(
    Output("row-count", "children"),
    Input("orders-grid", "source"),
    prevent_initial_call=True,
)
def receive_complete_source(source):
    return f"{len(source)} rows received"
```

The bridge snapshots `source` after every edit and updates it together with
`afteredit`. It suppresses the immediate echoed assignment when Dash returns
that same snapshot, avoiding a redundant grid reset.

Full synchronization costs memory, serialization time, and network bandwidth
proportional to the complete dataset.

## Complete component property reference

This is the complete public property surface generated for
`dash_datagrid.RevoGrid`.

### Dash host and event bridge

| Property | Python shape | Purpose |
| --- | --- | --- |
| `id` | `str` or Dash pattern ID | Component identifier |
| `className` | `str` | CSS class on the Dash host |
| `style` | `dict` | Inline host style; normally include a height |
| `afteredit` | `dict` | Latest dedicated edit envelope |
| `afterfocus` | `dict` | Latest dedicated focus envelope |
| `headerclick` | `dict` | Latest dedicated header-click envelope |
| `roworderchanged` | `dict` | Latest row-order envelope |
| `aftersortingapply` | `dict` | Latest completed-sorting envelope |
| `beforefilterapply` | `dict` | Latest pre-filter notification |
| `aftercolumnresize` | `dict` | Latest resize envelope |
| `eventListeners` | `list[str]` | Other Core event names to observe |
| `eventData` | `dict` | Latest generic event envelope |
| `syncSourceOnEdit` | `bool`, default `False` | Also update full Dash `source` after edits |

### Core data and schema

| Property | Python shape | Purpose | Documentation |
| --- | --- | --- | --- |
| `columns` | `list[dict]` | Regular/grouped column definitions | [Columns](https://rv-grid.com/guide/column) |
| `source` | `list[dict]` | Main row source | [Rows](https://rv-grid.com/guide/row) |
| `pinnedTopSource` | `list[dict]` | Top pinned rows | [Pinned Rows](https://rv-grid.com/guide/row/pin) |
| `pinnedBottomSource` | `list[dict]` | Bottom pinned rows | [Pinned Rows](https://rv-grid.com/guide/row/pin) |
| `columnTypes` | `dict` | Named JSON-safe column presets | [Column Types](https://rv-grid.com/guide/column/types) |
| `rowDefinitions` | `list[dict]` | Per-row sizes | [`RowDefinition`](https://rv-grid.com/guide/types/TypeAlias.RowDefinition) |
| `additionalData` | `dict` | Extra plain JSON context | [Advanced Configuration](https://rv-grid.com/guide/advanced-configuration#additionaldata) |

### Core layout and interaction

| Property | Python shape | Purpose | Documentation |
| --- | --- | --- | --- |
| `rowHeaders` | `bool` or `dict` | Row numbers or JSON-safe header options | [Row Headers](https://rv-grid.com/guide/row/headers) |
| `colSize` | number | Default column width | [Grid Size](https://rv-grid.com/guide/grid.size) |
| `rowSize` | number | Default row height | [Row Height](https://rv-grid.com/guide/row/height) |
| `rowClass` | `str` | Row field containing its CSS class | [Rows](https://rv-grid.com/guide/row#row-class-binding) |
| `resize` | `bool` | Allow column resizing | [Column Resize](https://rv-grid.com/guide/column/resize) |
| `autoSizeColumn` | `bool` or `dict` | Automatic column sizing | [Column Autosize](https://rv-grid.com/guide/column/autosize) |
| `stretch` | `bool` or `str` | Fill remaining horizontal space | [Column Stretch](https://rv-grid.com/guide/column/stretch) |
| `readonly` | `bool` | Make the complete grid read-only | [Editing](https://rv-grid.com/guide/editing) |
| `applyOnClose` | `bool` | Apply an editor value on close | [Editing](https://rv-grid.com/guide/editing) |
| `range` | `bool` | Enable range selection | [Selection API](https://rv-grid.com/guide/api/selectionFocus) |
| `useClipboard` | `bool` or `dict` | Clipboard behavior | [Clipboard](https://rv-grid.com/guide/clipboard) |
| `canFocus` | `bool` | Allow grid cell focus | [Advanced Configuration](https://rv-grid.com/guide/advanced-configuration#canfocus) |
| `canMoveColumns` | `bool` | Enable column movement | [Column Ordering](https://rv-grid.com/guide/column/order) |
| `canDrag` | `bool` | Allow native drag-and-drop | [Row Ordering](https://rv-grid.com/guide/row/order) |

### Core data features

| Property | Python shape | Purpose | Documentation |
| --- | --- | --- | --- |
| `filter` | `bool` or `dict` | Built-in filtering | [Filtering](https://rv-grid.com/guide/filters) |
| `sorting` | `dict` | External sorting configuration | [Sorting](https://rv-grid.com/guide/sorting) |
| `grouping` | `dict` | Core row grouping | [Row Grouping](https://rv-grid.com/guide/row/grouping) |
| `trimmedRows` | `dict` | Hidden physical main-row indexes | [Rows and Trimming](https://rv-grid.com/guide/row#managing-row-visibility) |
| `exporting` | `bool` | Enable Core export behavior | [Export Plugin](https://rv-grid.com/guide/export.plugin) |

### Core rendering and platform

| Property | Python shape | Purpose | Documentation |
| --- | --- | --- | --- |
| `theme` | `str` | Theme name | [Themes](https://rv-grid.com/guide/theme) |
| `accessible` | `bool` | Accessibility behavior | [Accessibility](https://rv-grid.com/guide/wcag) |
| `rtl` | `bool` | Right-to-left layout | [RTL](https://rv-grid.com/guide/rtl) |
| `frameSize` | number | Virtualization buffer | [Performance](https://rv-grid.com/guide/performance#framesize) |
| `disableVirtualX` | `bool` | Disable column virtualization | [Performance](https://rv-grid.com/guide/performance#disablevirtualx) |
| `disableVirtualY` | `bool` | Disable row virtualization | [Performance](https://rv-grid.com/guide/performance#disablevirtualy) |
| `virtualX` | `list[str]` | Column dimensions using X virtualization | [Viewports](https://rv-grid.com/guide/viewports) |
| `noHorizontalScrollTransfer` | `bool` | Do not mirror horizontal viewport scroll | [RevoGrid API](https://rv-grid.com/guide/api/revoGrid) |
| `hideAttribution` | `bool` | Hide attribution only with the required subscription | [Attribution](https://rv-grid.com/guide/attribution) |

Use the generated Python documentation locally:

```python
from dash_datagrid import RevoGrid

help(RevoGrid)
```

For exact Core defaults and TypeScript types, open the
[RevoGrid component API](https://rv-grid.com/guide/api/revoGrid).

## Python boundary limitations

### Explicitly excluded Core properties

| Property | Reason |
| --- | --- |
| `editors` | Contains editor constructors/classes |
| `plugins` | Contains plugin classes |
| `focusTemplate` | Contains a render function |
| `jobsBeforeRender` | Contains browser promises |
| `registerVNode` | Contains virtual nodes or render functions |

Functions nested inside otherwise supported objects are unsupported too. That
includes custom cell/header renderers, custom editor constructors, custom
comparators or parsers, custom filters, and custom grouping renderers.

### `before*` events are notifications in Python

Cancelable RevoGrid `before*` events rely on a synchronous JavaScript listener
calling `preventDefault()`. A Python callback runs after a network round trip,
so `beforefilterapply` and generic `before*` callbacks cannot cancel or rewrite
the browser action.

### Imperative methods are not exposed

The Core API documents selection, scrolling, data, export, and targeted-update
methods for JavaScript. They are not callable through the Python component in
v1. Use Dash output props for Python-driven changes.

## Troubleshooting

### Blank or zero-height grid

Set a height on the component host:

```python
RevoGrid(..., style={"height": "60vh", "minHeight": 320})
```

### Value is not JSON serializable

Normalize DataFrame, NumPy, `Decimal`, datetime, UUID, and custom object values
before passing them to Dash.

### Custom renderer/editor/comparator/filter is ignored

Those APIs require JavaScript functions and are outside the Python v1
boundary.

### `before*` callback does not cancel the operation

Python callbacks cannot synchronously call the browser event's
`preventDefault()`.

### Large request after each edit

Leave `syncSourceOnEdit=False` and use the compact `afteredit` delta.

### Generic event is not received

Use the lowercase name from the
[Events API](https://rv-grid.com/guide/api/events). Dedicated event names
update their named property instead of `eventData`.

## Complete RevoGrid documentation map

The Dash component is generated from the Core metadata. These are the
authoritative API and feature references:

| Area | Documentation |
| --- | --- |
| Complete component properties, events, methods | [RevoGrid API](https://rv-grid.com/guide/api/revoGrid) |
| Complete event names and payloads | [Events API](https://rv-grid.com/guide/api/events) |
| Event order and lifecycle | [Event Patterns](https://rv-grid.com/guide/events-guide) |
| Generated TypeScript type index | [Type Reference](https://rv-grid.com/guide/types/README) |
| Columns | [Column Guide](https://rv-grid.com/guide/column), [`ColumnRegular`](https://rv-grid.com/guide/types/Interface.ColumnRegular), [`ColumnGrouping`](https://rv-grid.com/guide/types/Interface.ColumnGrouping) |
| Rows | [Row Guide](https://rv-grid.com/guide/row), [Headers](https://rv-grid.com/guide/row/headers), [Height](https://rv-grid.com/guide/row/height), [Pinning](https://rv-grid.com/guide/row/pin), [Ordering](https://rv-grid.com/guide/row/order) |
| Editing, selection, clipboard | [Editing](https://rv-grid.com/guide/editing), [Selection API](https://rv-grid.com/guide/api/selectionFocus), [Clipboard](https://rv-grid.com/guide/clipboard), [Clipboard API](https://rv-grid.com/guide/api/clipboard) |
| Filtering, sorting, grouping | [Filtering](https://rv-grid.com/guide/filters), [Sorting](https://rv-grid.com/guide/sorting), [Grouping](https://rv-grid.com/guide/row/grouping) |
| Sizing and column layout | [Grid Size](https://rv-grid.com/guide/grid.size), [Autosize](https://rv-grid.com/guide/column/autosize), [Resize](https://rv-grid.com/guide/column/resize), [Stretch](https://rv-grid.com/guide/column/stretch), [Pin Columns](https://rv-grid.com/guide/column/pin), [Column Order](https://rv-grid.com/guide/column/order) |
| Data ownership and remote data | [Data Sync](https://rv-grid.com/guide/data-sync), [Server-side Data](https://rv-grid.com/guide/server-side-data), [Real-time Updates](https://rv-grid.com/guide/realtime-updates) |
| Virtualization | [Performance](https://rv-grid.com/guide/performance), [Viewports](https://rv-grid.com/guide/viewports) |
| Platform and appearance | [Themes](https://rv-grid.com/guide/theme), [Accessibility](https://rv-grid.com/guide/wcag), [RTL](https://rv-grid.com/guide/rtl) |
| Export | [Export Plugin](https://rv-grid.com/guide/export.plugin), [Excel Export](https://rv-grid.com/guide/data-grid-export-excel), [PDF Export](https://rv-grid.com/guide/pdf-export) |

Some Core pages include browser-only functions and methods. Use the property
tables and boundary section above to determine what the Dash package exposes.

## npm package

The npm distribution is `@revolist/dash-datagrid`. It exports the generated
React bridge and bundles the standalone RevoGrid custom element. React and
ReactDOM remain peer dependencies. Python Dash applications should install the
PyPI package instead.

The Stencil Dash output target is private build tooling in the RevoGrid
repository root. It is bundled into this package's generated JavaScript and is
not a public npm package or runtime dependency.

## Example application

[`examples/`](https://github.com/revolist/dash-datagrid/tree/main/examples)
is a complete project with its own dependency manifest, setup instructions,
responsive styling, a DataFrame-backed grid, Python-driven data changes, and
dedicated plus generic callbacks.

Run it from the repository:

```bash
cd examples
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python app.py
```

## Development

Development requires Node 22, npm, and Python 3.10 or newer:

```bash
npm install
python -m venv .venv
.venv/bin/python -m pip install -r requirements-dev.txt
npm run build
npm test
npm run test:browser
```

`npm run build` bundles the standalone custom elements with React externalized,
then runs the official `dash-generate-components` pipeline.

## Release

The release workflow preflights the exact version on npm and PyPI, tests the
npm tarball and Python distributions, publishes both registries, and creates
the matching Git tag and GitHub release.
