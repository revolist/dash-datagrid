import inspect

from dash_datagrid import RevoGrid


JSON_SAFE_GRID_PROPERTIES = {
    "accessible",
    "additionalData",
    "applyOnClose",
    "autoSizeColumn",
    "canDrag",
    "canFocus",
    "canMoveColumns",
    "colSize",
    "columnTypes",
    "columns",
    "disableVirtualX",
    "disableVirtualY",
    "exporting",
    "filter",
    "frameSize",
    "grouping",
    "hideAttribution",
    "noHorizontalScrollTransfer",
    "pinnedBottomSource",
    "pinnedTopSource",
    "range",
    "readonly",
    "resize",
    "rowClass",
    "rowDefinitions",
    "rowHeaders",
    "rowSize",
    "rtl",
    "sorting",
    "source",
    "stretch",
    "theme",
    "trimmedRows",
    "useClipboard",
    "virtualX",
}


def test_public_signature_and_exclusions():
    signature = inspect.signature(RevoGrid)
    assert JSON_SAFE_GRID_PROPERTIES <= set(signature.parameters)
    for prop in (
        "id",
        "className",
        "style",
        "columns",
        "source",
        "afteredit",
        "eventListeners",
        "eventData",
        "syncSourceOnEdit",
    ):
        assert prop in signature.parameters
    for prop in (
        "editors",
        "plugins",
        "focusTemplate",
        "jobsBeforeRender",
        "registerVNode",
    ):
        assert prop not in signature.parameters


def test_component_serializes_dash_properties():
    component = RevoGrid(
        id="grid",
        columns=[{"prop": "name", "name": "Name"}],
        source=[{"name": "Ada"}],
        eventListeners=["created"],
        syncSourceOnEdit=True,
    )
    payload = component.to_plotly_json()
    assert payload["namespace"] == "dash_datagrid"
    assert payload["type"] == "RevoGrid"
    assert payload["props"]["source"] == [{"name": "Ada"}]
    assert payload["props"]["syncSourceOnEdit"] is True
