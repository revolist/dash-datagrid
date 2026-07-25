# AUTO GENERATED FILE - DO NOT EDIT

import typing  # noqa: F401
from typing_extensions import TypedDict, NotRequired, Literal # noqa: F401
from dash.development.base_component import Component, _explicitize_args
try:
    from dash.types import NumberType  # noqa: F401
except ImportError:
    # Backwards compatibility for dash<=4.1.0
    if typing.TYPE_CHECKING:
        raise
    NumberType = typing.Union[  # noqa: F401
        typing.SupportsFloat, typing.SupportsInt, typing.SupportsComplex
    ]

ComponentSingleType = typing.Union[str, int, float, Component, None]
ComponentType = typing.Union[
    ComponentSingleType,
    typing.Sequence[ComponentSingleType],
]


class RevoGrid(Component):
    """A RevoGrid component.
High-performance virtual data grid exposed as a Plotly Dash component.

Keyword arguments:

- id (string; optional):
    Dash component identifier.

- accessible (boolean; optional):
    Enables accessibility attributes and keyboard behavior.

- additionalData (dict; optional):
    Additional plain JSON data available to grid configuration.

- aftercolumnresize (dict; optional):
    Latest aftercolumnresize JSON-safe event envelope.

- afteredit (dict; optional):
    Latest compact afteredit JSON-safe event envelope.

- afterfocus (dict; optional):
    Latest afterfocus JSON-safe event envelope.

- aftersortingapply (dict; optional):
    Latest aftersortingapply JSON-safe event envelope.

- applyOnClose (boolean; optional):
    Applies filter changes when the filter popover closes.

- autoSizeColumn (boolean | dict; optional):
    Enables or configures automatic column sizing.

- beforefilterapply (dict; optional):
    Latest beforefilterapply notification. Python cannot cancel it
    synchronously.

- canDrag (boolean; optional):
    Enables row dragging.

- canFocus (boolean; optional):
    Allows the grid to receive focus.

- canMoveColumns (boolean; optional):
    Enables column reordering.

- className (string; optional):
    CSS class applied to the RevoGrid component host.

- colSize (number; optional):
    Default column width in pixels.

- columnTypes (dict; optional):
    Named JSON-safe column type definitions. Function members are
    unsupported.

- columns (list; optional):
    Column definitions. Function-valued renderers and editors are
    unsupported.

- disableVirtualX (boolean; optional):
    Disables horizontal virtualization.

- disableVirtualY (boolean; optional):
    Disables vertical virtualization.

- eventData (dict; optional):
    Latest JSON-safe event envelope from eventListeners.

- eventListeners (list of strings; optional):
    Other RevoGrid event names to publish through eventData.

- exporting (boolean; optional):
    Enables export behavior.

- filter (boolean | dict; optional):
    Enables or configures filtering. Function-valued custom filters
    are unsupported.

- frameSize (number; optional):
    Number of extra virtualized items rendered around the viewport.

- grouping (dict; optional):
    JSON-safe row-grouping configuration.

- headerclick (dict; optional):
    Latest headerclick JSON-safe event envelope.

- hideAttribution (boolean; optional):
    Hides the RevoGrid attribution link.

- noHorizontalScrollTransfer (boolean; optional):
    Prevents wheel transfer from horizontal grid scrolling.

- pinnedBottomSource (list; optional):
    Rows pinned to the bottom viewport.

- pinnedTopSource (list; optional):
    Rows pinned to the top viewport.

- range (boolean; optional):
    Enables range selection.

- readonly (boolean; optional):
    Makes cells read-only.

- resize (boolean; optional):
    Enables column resizing.

- rowClass (string; optional):
    CSS class applied to grid rows.

- rowDefinitions (list; optional):
    Per-row size definitions.

- rowHeaders (boolean | dict; optional):
    Enables or configures row headers.

- rowSize (number; optional):
    Default row height in pixels.

- roworderchanged (dict; optional):
    Latest roworderchanged JSON-safe event envelope.

- rtl (boolean; optional):
    Enables right-to-left layout.

- sorting (dict; optional):
    JSON-safe sorting configuration.

- source (list; optional):
    Main row source. Pass DataFrame data with df.to_dict(\"records\").

- stretch (boolean | string; optional):
    Enables or configures column stretching.

- syncSourceOnEdit (boolean; default False):
    When True, afteredit also updates the complete Dash source
    property.

- theme (string; optional):
    Grid theme name.

- trimmedRows (dict; optional):
    Map of trimmed physical row indexes.

- useClipboard (boolean | dict; optional):
    Enables or configures clipboard behavior.

- virtualX (list; optional):
    Horizontal viewport dimension identifiers."""
    _children_props: typing.List[str] = []
    _base_nodes = ['children']
    _namespace = 'dash_datagrid'
    _type = 'RevoGrid'


    def __init__(
        self,
        id: typing.Optional[typing.Union[str, dict]] = None,
        className: typing.Optional[str] = None,
        style: typing.Optional[typing.Any] = None,
        accessible: typing.Optional[bool] = None,
        additionalData: typing.Optional[dict] = None,
        applyOnClose: typing.Optional[bool] = None,
        autoSizeColumn: typing.Optional[typing.Union[bool, dict]] = None,
        canDrag: typing.Optional[bool] = None,
        canFocus: typing.Optional[bool] = None,
        canMoveColumns: typing.Optional[bool] = None,
        colSize: typing.Optional[NumberType] = None,
        columnTypes: typing.Optional[dict] = None,
        columns: typing.Optional[typing.Sequence] = None,
        disableVirtualX: typing.Optional[bool] = None,
        disableVirtualY: typing.Optional[bool] = None,
        exporting: typing.Optional[bool] = None,
        filter: typing.Optional[typing.Union[bool, dict]] = None,
        frameSize: typing.Optional[NumberType] = None,
        grouping: typing.Optional[dict] = None,
        hideAttribution: typing.Optional[bool] = None,
        noHorizontalScrollTransfer: typing.Optional[bool] = None,
        pinnedBottomSource: typing.Optional[typing.Sequence] = None,
        pinnedTopSource: typing.Optional[typing.Sequence] = None,
        range: typing.Optional[bool] = None,
        readonly: typing.Optional[bool] = None,
        resize: typing.Optional[bool] = None,
        rowClass: typing.Optional[str] = None,
        rowDefinitions: typing.Optional[typing.Sequence] = None,
        rowHeaders: typing.Optional[typing.Union[bool, dict]] = None,
        rowSize: typing.Optional[NumberType] = None,
        rtl: typing.Optional[bool] = None,
        sorting: typing.Optional[dict] = None,
        source: typing.Optional[typing.Sequence] = None,
        stretch: typing.Optional[typing.Union[bool, str]] = None,
        theme: typing.Optional[str] = None,
        trimmedRows: typing.Optional[dict] = None,
        useClipboard: typing.Optional[typing.Union[bool, dict]] = None,
        virtualX: typing.Optional[typing.Sequence] = None,
        aftercolumnresize: typing.Optional[dict] = None,
        afteredit: typing.Optional[dict] = None,
        afterfocus: typing.Optional[dict] = None,
        aftersortingapply: typing.Optional[dict] = None,
        beforefilterapply: typing.Optional[dict] = None,
        headerclick: typing.Optional[dict] = None,
        roworderchanged: typing.Optional[dict] = None,
        eventListeners: typing.Optional[typing.Sequence[str]] = None,
        eventData: typing.Optional[dict] = None,
        syncSourceOnEdit: typing.Optional[bool] = None,
        **kwargs
    ):
        self._prop_names = ['id', 'accessible', 'additionalData', 'aftercolumnresize', 'afteredit', 'afterfocus', 'aftersortingapply', 'applyOnClose', 'autoSizeColumn', 'beforefilterapply', 'canDrag', 'canFocus', 'canMoveColumns', 'className', 'colSize', 'columnTypes', 'columns', 'disableVirtualX', 'disableVirtualY', 'eventData', 'eventListeners', 'exporting', 'filter', 'frameSize', 'grouping', 'headerclick', 'hideAttribution', 'noHorizontalScrollTransfer', 'pinnedBottomSource', 'pinnedTopSource', 'range', 'readonly', 'resize', 'rowClass', 'rowDefinitions', 'rowHeaders', 'rowSize', 'roworderchanged', 'rtl', 'sorting', 'source', 'stretch', 'style', 'syncSourceOnEdit', 'theme', 'trimmedRows', 'useClipboard', 'virtualX']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'accessible', 'additionalData', 'aftercolumnresize', 'afteredit', 'afterfocus', 'aftersortingapply', 'applyOnClose', 'autoSizeColumn', 'beforefilterapply', 'canDrag', 'canFocus', 'canMoveColumns', 'className', 'colSize', 'columnTypes', 'columns', 'disableVirtualX', 'disableVirtualY', 'eventData', 'eventListeners', 'exporting', 'filter', 'frameSize', 'grouping', 'headerclick', 'hideAttribution', 'noHorizontalScrollTransfer', 'pinnedBottomSource', 'pinnedTopSource', 'range', 'readonly', 'resize', 'rowClass', 'rowDefinitions', 'rowHeaders', 'rowSize', 'roworderchanged', 'rtl', 'sorting', 'source', 'stretch', 'style', 'syncSourceOnEdit', 'theme', 'trimmedRows', 'useClipboard', 'virtualX']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(RevoGrid, self).__init__(**args)

setattr(RevoGrid, "__init__", _explicitize_args(RevoGrid.__init__))
