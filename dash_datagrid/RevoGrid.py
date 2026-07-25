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
Revogrid - High-performance, customizable grid library for managing large datasets. ### Events guide For a comprehensive events guide, check the [Events API Page](/guide/api/events). All events propagate to the root level of the grid. [Dependency tree](#Dependencies). ### Type definitions Read [type definition file](https://github.com/revolist/revogrid/blob/master/src/interfaces.d.ts) for the full interface information. All complex property types such as `ColumnRegular`, `ColumnProp`, `ColumnDataSchemaModel` can be found there. ### HTMLRevoGridElement

Keyword arguments:

- id (string; optional):
    Dash component identifier.

- accessible (boolean; optional):
    Enable accessibility. If disabled, the grid will not be
    accessible.

- additionalData (boolean | number | string | dict | list; optional):
    Additional data to be passed to plugins, renders or editors. For
    example if you need to pass Vue component instance.

- aftercolumnresize (dict; optional):
    Emitted after column resizing. Useful for retrieving the resized
    columns. Contains a JSON-safe event envelope.

- afteredit (dict; optional):
    After data applied or range changed. Contains a JSON-safe event
    envelope.

- afterfocus (dict; optional):
    After focus render finished. Can be used to access a focus element
    through `event.target`. This is just a duplicate of `afterfocus`
    from `revogr-focus.tsx`. Contains a JSON-safe event envelope.

- aftersortingapply (dict; optional):
    By `SortingPlugin` <br>Triggered after sorting has been applied
    and completed. <br>Provides final sorting state and sorting column
    metadata when available. Contains a JSON-safe event envelope.

- applyOnClose (boolean; optional):
    Apply changes in editor when closed except 'Escape' cases. If
    custom editor in use method getValue required. Check
    interfaces.d.ts `EditorBase` for more info.

- autoSizeColumn (boolean; optional):
    Autosize config. Enables columns autoSize. For more details check
    `autoSizeColumn` plugin. By default disabled, hence operation is
    not performance efficient. `True` to enable with default params
    (double header separator click for autosize). Or define config.
    See `AutoSizeColumnConfig` for more details.

- beforefilterapply (dict; optional):
    Emitted before applying a filter to the data source. Use
    e.preventDefault() to prevent cell focus change. Modify if you
    need to change filters. Contains a JSON-safe event envelope.

- canDrag (boolean; optional):
    Disable native drag&drop plugin.

- canFocus (boolean; optional):
    When True cell focus appear.

- canMoveColumns (boolean; optional):
    Enable column move plugin.

- className (string; optional):
    CSS class applied to the RevoGrid component host.

- colSize (number; optional):
    Indicates default column size.

- columnTypes (dict; optional):
    Column Types Format. Every type represent multiple column
    properties. Types will be merged but can be replaced with column
    properties. Types were made as separate objects to be reusable per
    multiple columns.

- columns (list; optional):
    Columns - defines an array of grid columns. Can be column or
    grouped column.

- disableVirtualX (boolean; optional):
    Disable lazy rendering mode for the `X axis`. Use when not many
    columns present and you don't need rerenader cells during scroll.
    Can be used for initial rendering performance improvement.

- disableVirtualY (boolean; optional):
    Disable lazy rendering mode for the `Y axis`. Use when not many
    rows present and you don't need rerenader cells during scroll. Can
    be used for initial rendering performance improvement.

- eventData (dict; optional):
    Latest JSON-safe event envelope from eventListeners.

- eventListeners (list of strings; optional):
    Additional RevoGrid event names to publish through eventData.

- exporting (boolean; optional):
    Enable export plugin.

- filter (boolean; optional):
    Enables filter plugin. Can be boolean. Or can be filter collection
    See `FilterCollection` for more info.

- frameSize (number; optional):
    Defines how many rows/columns should be rendered outside visible
    area.

- grouping (dict; optional):
    Group rows based on this property. Define properties to be groped
    by grouping plugin See `GroupingOptions`.

- headerclick (dict; optional):
    On header click. Contains a JSON-safe event envelope.

- hideAttribution (boolean; optional):
    Please only hide the attribution if you are subscribed to Pro
    version.

- noHorizontalScrollTransfer (boolean; optional):
    Prevents horizontal scroll state from being mirrored across
    viewport sections.

- pinnedBottomSource (list; optional):
    Pinned bottom Source: {[T in ColumnProp]: any} - defines pinned
    bottom rows data source.

- pinnedTopSource (list; optional):
    Pinned top Source: {[T in ColumnProp]: any} - defines pinned top
    rows data source.

- range (boolean; optional):
    When True, user can select a cell range. Required for range-based
    clipboard fill.

- readonly (boolean; optional):
    When True, grid in read only mode.

- resize (boolean; optional):
    When True, columns are resizable.

- rowClass (string; optional):
    Row class property mapping. Map custom classes to rows from row
    object data. Define this property in rgRow object and this will be
    mapped as rgRow class.

- rowDefinitions (list; optional):
    Custom row properies to be applied. See `RowDefinition` for more
    info.

- rowHeaders (boolean; optional):
    Excel like functionality. Show row numbers. Also can be used for
    custom row header render if object provided.

- rowSize (number; optional):
    Indicates default rgRow size. By default 0, means theme package
    size will be applied Alternatively you can use `rowSize` to reset
    viewport.

- roworderchanged (dict; optional):
    Before the order of `rgRow` is applied. To prevent the default
    behavior of changing the order of `rgRow`, you can call
    `e.preventDefault()`. Contains a JSON-safe event envelope.

- rtl (boolean; optional):
    Enable right-to-left (RTL) mode. When enabled, columns will be
    displayed from right to left.

- sorting (dict; optional):
    Alternative way to set sorting. `{columns: [{prop: 'name', order:
    'asc'}]}` Use SortingPlugin to get current sorting state.

- source (list; optional):
    Source - defines main data source. Can be an Object or 2
    dimensional array([][]); Keys/indexes referenced from columns
    Prop.

- stretch (boolean | string; optional):
    Stretch strategy for columns by `StretchColumn` plugin. For
    example if there are more space on the right last column size
    would be increased.

- syncSourceOnEdit (boolean; default False):
    When True, afteredit also updates the complete Dash source
    property.

- theme (string; optional):
    Theme name.

- trimmedRows (boolean | number; optional):
    Trimmed rows. Functionality which allows to hide rows from main
    data set. `trimmedRows` are physical `rgRow` indexes to hide.

- useClipboard (boolean; optional):
    When True enable clipboard. Can be boolean or clipboard config.

- virtualX (list; optional):
    Column dimensions that use X axis virtual rendering. Defaults to
    regular columns only to preserve pinned column behavior. Set to
    `['rgCol', 'colPinStart', 'colPinEnd']` to virtualize all column
    areas."""
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
        additionalData: typing.Optional[typing.Any] = None,
        applyOnClose: typing.Optional[bool] = None,
        autoSizeColumn: typing.Optional[bool] = None,
        canDrag: typing.Optional[bool] = None,
        canFocus: typing.Optional[bool] = None,
        canMoveColumns: typing.Optional[bool] = None,
        colSize: typing.Optional[NumberType] = None,
        columns: typing.Optional[typing.Sequence] = None,
        columnTypes: typing.Optional[dict] = None,
        disableVirtualX: typing.Optional[bool] = None,
        disableVirtualY: typing.Optional[bool] = None,
        exporting: typing.Optional[bool] = None,
        filter: typing.Optional[bool] = None,
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
        rowHeaders: typing.Optional[bool] = None,
        rowSize: typing.Optional[NumberType] = None,
        rtl: typing.Optional[bool] = None,
        sorting: typing.Optional[dict] = None,
        source: typing.Optional[typing.Sequence] = None,
        stretch: typing.Optional[typing.Union[bool, str]] = None,
        theme: typing.Optional[str] = None,
        trimmedRows: typing.Optional[typing.Union[bool, NumberType]] = None,
        useClipboard: typing.Optional[bool] = None,
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
