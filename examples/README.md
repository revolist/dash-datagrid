# Dash DataGrid example

This is a complete Plotly Dash project using the local `dash-datagrid`
package. It demonstrates:

- a pandas DataFrame normalized for Dash's JSON boundary;
- editable, sortable, filterable, resizable, and pinned columns;
- Python-driven replacement of the complete `source`;
- compact `afteredit` callbacks with `syncSourceOnEdit=False`;
- dedicated RevoGrid event properties;
- generic events through `eventListeners` and `eventData`;
- Dash's automatic `assets/` CSS loading.

## Project structure

```text
examples/
├── assets/
│   └── app.css
├── .gitignore
├── app.py
├── README.md
└── requirements.txt
```

## Run from the repository

From this `examples` directory:

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python app.py
```

On Windows PowerShell:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```

Open [http://127.0.0.1:8050](http://127.0.0.1:8050).

`requirements.txt` installs the parent `dash-datagrid` source in editable
mode, so changes to the generated Python component are immediately visible.

## Run against the published package

If this directory is copied outside the repository, install the published
package instead of the editable parent:

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install "dash-datagrid" "pandas>=2,<4"
python app.py
```

## Configuration

The server accepts these optional environment variables:

| Variable | Default | Purpose |
| --- | --- | --- |
| `DASH_HOST` | `127.0.0.1` | Interface on which Dash listens |
| `DASH_PORT` | `8050` | HTTP port |
| `DASH_DEBUG` | `1` | Set to `0` to disable debug/reload mode |

The complete Dash integration guide is available at
[rv-grid.com/guide/dash](https://rv-grid.com/guide/dash/).
