import json
import os

from dash import Dash, Input, Output, ctx, html

from dash_datagrid import RevoGrid


EVENT_PROPERTIES = [
    "afteredit",
    "afterfocus",
    "headerclick",
    "roworderchanged",
    "aftersortingapply",
    "beforefilterapply",
    "aftercolumnresize",
    "eventData",
]

app = Dash(__name__)
app.layout = html.Div(
    [
        html.Button("Replace rows", id="replace"),
        html.Button("Load large source", id="load-large"),
        html.Button("Switch listener", id="switch-listener"),
        RevoGrid(
            id="grid",
            columns=[
                {
                    "prop": "name",
                    "name": "Name",
                    "sortable": True,
                    "filter": True,
                    "size": 140,
                },
                {"prop": "score", "name": "Score"},
            ],
            source=[{"name": "Ada", "score": 10}],
            eventListeners=["created"],
            filter=True,
            resize=True,
            range=True,
            style={"height": 220},
        ),
        html.Div(
            [
                html.Pre("waiting", id=f"event-{prop}")
                for prop in EVENT_PROPERTIES
            ],
            id="events",
        ),
    ]
)


@app.callback(
    Output("grid", "source"),
    Input("replace", "n_clicks"),
    Input("load-large", "n_clicks"),
    prevent_initial_call=True,
)
def replace_rows(_replace_clicks, _large_clicks):
    if ctx.triggered_id == "load-large":
        return [
            {"name": f"Row {index}", "score": index}
            for index in range(10_000)
        ]
    return [
        {"name": "Grace", "score": 20},
        {"name": "Linus", "score": 30},
    ]


@app.callback(
    Output("grid", "eventListeners"),
    Input("switch-listener", "n_clicks"),
    prevent_initial_call=True,
)
def switch_listener(_clicks):
    return ["contentsizechanged"]


def register_event_callback(prop):
    @app.callback(
        Output(f"event-{prop}", "children"),
        Input("grid", prop),
        prevent_initial_call=True,
    )
    def show_event(event):
        return json.dumps(event, sort_keys=True)


for event_property in EVENT_PROPERTIES:
    register_event_callback(event_property)


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=int(os.environ.get("DASH_TEST_PORT", "8057")),
        debug=False,
    )
