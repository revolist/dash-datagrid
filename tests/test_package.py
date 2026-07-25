from pathlib import Path

import dash_datagrid


def test_python_package_contains_dash_assets():
    package_dir = Path(dash_datagrid.__file__).parent
    for relative_path in (
        "RevoGrid.py",
        "RevoGrid.react.js",
        "dash-datagrid.js",
        "dash-datagrid.js.map",
        "dash_datagrid.min.js",
        "dash_datagrid.min.js.map",
        "metadata.json",
        "package-info.json",
    ):
        assert (package_dir / relative_path).is_file(), relative_path


def test_dash_registers_local_bundle_and_source_map():
    assert dash_datagrid._js_dist == [
        {
            "relative_package_path": "dash_datagrid.min.js",
            "namespace": "dash_datagrid",
        },
        {
            "relative_package_path": "dash_datagrid.min.js.map",
            "namespace": "dash_datagrid",
            "dynamic": True,
        },
    ]
