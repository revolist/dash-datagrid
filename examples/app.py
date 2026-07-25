"""Runnable Dash DataGrid example project."""

from __future__ import annotations

import json
import os
from pathlib import Path

from dash import Dash, Input, Output, callback, ctx, html
import pandas as pd

from dash_datagrid import RevoGrid


ORDERS_FRAME = pd.DataFrame(
    [
        {
            "order": "A-100",
            "customer": "Ada Lovelace",
            "status": "Processing",
            "amount": 120.0,
            "placed_at": pd.Timestamp("2026-07-18"),
        },
        {
            "order": "A-101",
            "customer": "Grace Hopper",
            "status": "Shipped",
            "amount": 85.5,
            "placed_at": pd.Timestamp("2026-07-19"),
        },
        {
            "order": "A-102",
            "customer": "Linus Torvalds",
            "status": "Processing",
            "amount": 210.0,
            "placed_at": pd.Timestamp("2026-07-20"),
        },
        {
            "order": "A-103",
            "customer": "Margaret Hamilton",
            "status": "Delivered",
            "amount": 340.25,
            "placed_at": pd.Timestamp("2026-07-21"),
        },
        {
            "order": "A-104",
            "customer": "Edsger Dijkstra",
            "status": "On hold",
            "amount": None,
            "placed_at": pd.Timestamp("2026-07-22"),
        },
        {
            "order": "A-105",
            "customer": "Barbara Liskov",
            "status": "Shipped",
            "amount": 175.75,
            "placed_at": pd.Timestamp("2026-07-23"),
        },
    ]
)

COLUMNS = [
    {
        "prop": "order",
        "name": "Order",
        "readonly": True,
        "pin": "colPinStart",
        "size": 110,
    },
    {
        "prop": "customer",
        "name": "Customer",
        "sortable": True,
        "minSize": 190,
    },
    {
        "prop": "status",
        "name": "Status",
        "sortable": True,
        "filter": "string",
        "size": 135,
    },
    {
        "prop": "amount",
        "name": "Amount",
        "sortable": True,
        "filter": "number",
        "size": 120,
    },
    {
        "prop": "placed_at",
        "name": "Placed",
        "sortable": True,
        "size": 150,
    },
]

DEDICATED_EVENT_PROPERTIES = (
    "afteredit",
    "afterfocus",
    "headerclick",
    "aftersortingapply",
    "beforefilterapply",
    "aftercolumnresize",
)


def dataframe_records(frame: pd.DataFrame) -> list[dict]:
    """Convert pandas values into records accepted by Dash's JSON boundary."""

    return json.loads(
        frame.to_json(
            orient="records",
            date_format="iso",
        )
    )


def records_for_view(view: str) -> list[dict]:
    """Return a complete dataset for a Python-driven source replacement."""

    if view == "high-value":
        frame = ORDERS_FRAME[ORDERS_FRAME["amount"].fillna(0) >= 200]
    else:
        frame = ORDERS_FRAME
    return dataframe_records(frame)


PROJECT_DIR = Path(__file__).resolve().parent

app = Dash(
    __name__,
    assets_folder=str(PROJECT_DIR / "assets"),
)
app.title = "Dash DataGrid example"

app.layout = html.Main(
    className="app-shell",
    children=[
        html.Header(
            className="hero",
            children=[
                html.P("REVOGRID + PLOTLY DASH", className="eyebrow"),
                html.H1("Orders workspace"),
                html.P(
                    "Edit cells, sort headers, open a filter, resize columns, "
                    "or switch the dataset from Python.",
                    className="lede",
                ),
            ],
        ),
        html.Section(
            className="toolbar",
            children=[
                html.Div(
                    className="toolbar-actions",
                    children=[
                        html.Button(
                            "All orders",
                            id="show-all",
                            n_clicks=0,
                            className="button button-primary",
                        ),
                        html.Button(
                            "High value only",
                            id="show-high-value",
                            n_clicks=0,
                            className="button",
                        ),
                    ],
                ),
                html.Span(
                    f"{len(ORDERS_FRAME)} rows loaded",
                    id="dataset-status",
                    className="dataset-status",
                ),
            ],
        ),
        html.Section(
            className="grid-card",
            children=[
                RevoGrid(
                    id="orders-grid",
                    columns=COLUMNS,
                    source=records_for_view("all"),
                    rowHeaders={"size": 54},
                    resize=True,
                    range=True,
                    filter=True,
                    stretch="last",
                    theme="compact",
                    syncSourceOnEdit=False,
                    eventListeners=[
                        "aftergridinit",
                        "filterconfigchanged",
                        "sortingconfigchanged",
                    ],
                    className="orders-grid",
                    style={"height": 480},
                ),
            ],
        ),
        html.Section(
            className="event-card",
            children=[
                html.Div(
                    children=[
                        html.P("DASH CALLBACK", className="eyebrow"),
                        html.H2("Latest grid event"),
                        html.P(
                            "Dedicated events and eventData share the same "
                            "JSON-safe envelope.",
                            className="event-help",
                        ),
                    ]
                ),
                html.Pre(
                    "Interact with the grid to receive an event.",
                    id="event-output",
                ),
            ],
        ),
    ],
)


@callback(
    Output("orders-grid", "source"),
    Output("dataset-status", "children"),
    Input("show-all", "n_clicks"),
    Input("show-high-value", "n_clicks"),
    prevent_initial_call=True,
)
def change_dataset(_show_all: int, _show_high_value: int):
    """Demonstrate an intentional Python-driven source replacement."""

    view = "high-value" if ctx.triggered_id == "show-high-value" else "all"
    records = records_for_view(view)
    label = "high-value orders" if view == "high-value" else "orders"
    return records, f"{len(records)} {label} loaded"


@callback(
    Output("event-output", "children"),
    Input("orders-grid", "afteredit"),
    Input("orders-grid", "afterfocus"),
    Input("orders-grid", "headerclick"),
    Input("orders-grid", "aftersortingapply"),
    Input("orders-grid", "beforefilterapply"),
    Input("orders-grid", "aftercolumnresize"),
    Input("orders-grid", "eventData"),
    prevent_initial_call=True,
)
def show_event(
    afteredit,
    afterfocus,
    headerclick,
    aftersortingapply,
    beforefilterapply,
    aftercolumnresize,
    event_data,
):
    """Render the event property that triggered this callback."""

    property_name = ctx.triggered[0]["prop_id"].rsplit(".", 1)[1]
    events = dict(
        zip(
            DEDICATED_EVENT_PROPERTIES,
            (
                afteredit,
                afterfocus,
                headerclick,
                aftersortingapply,
                beforefilterapply,
                aftercolumnresize,
            ),
            strict=True,
        )
    )
    events["eventData"] = event_data
    event = events[property_name]
    return json.dumps(event, indent=2, sort_keys=True)


if __name__ == "__main__":
    app.run(
        host=os.environ.get("DASH_HOST", "127.0.0.1"),
        port=int(os.environ.get("DASH_PORT", "8050")),
        debug=os.environ.get("DASH_DEBUG", "1") != "0",
    )
