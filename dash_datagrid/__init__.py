"""Plotly Dash bindings for RevoGrid Core."""

import json
from importlib.metadata import PackageNotFoundError, version
from importlib.resources import files

from ._imports_ import *
from ._imports_ import __all__

try:
    __version__ = version("dash-datagrid")
except PackageNotFoundError:
    with files(__package__).joinpath("package-info.json").open() as package_info:
        __version__ = json.load(package_info)["version"]

_js_dist = [
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
