from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path

import pandas as pd


EXAMPLE_PATH = Path(__file__).parents[1] / "examples" / "app.py"


def load_example():
    spec = spec_from_file_location("dash_datagrid_example", EXAMPLE_PATH)
    assert spec
    assert spec.loader
    module = module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def test_example_is_a_runnable_dash_project():
    example = load_example()
    client = example.app.server.test_client()

    assert example.app.layout
    assert example.app.title == "Dash DataGrid example"
    assert len(example.records_for_view("all")) == 6
    assert len(example.records_for_view("high-value")) == 2
    assert client.get("/").status_code == 200
    assert client.get("/assets/app.css").status_code == 200
    assert (
        client.get(
            "/_dash-component-suites/"
            "dash_datagrid/dash_datagrid.min.js"
        ).status_code
        == 200
    )


def test_example_normalizes_dataframe_values_for_dash():
    example = load_example()
    records = example.dataframe_records(
        pd.DataFrame(
            [
                {
                    "placed_at": pd.Timestamp("2026-07-25"),
                    "amount": float("nan"),
                }
            ]
        )
    )

    assert records == [
        {
            "placed_at": "2026-07-25T00:00:00.000",
            "amount": None,
        }
    ]
