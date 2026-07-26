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

- additionaldatachanged (dict; optional):
    Emmited after the additional data is changed Contains a JSON-safe
    event envelope.

- afteranysource (dict; optional):
    Emitted after each source update, whether from the pinned or main
    viewport. Useful for tracking all changes originating from sources
    in both the pinned and main viewports. Contains a JSON-safe event
    envelope.

- aftercolumnresize (dict; optional):
    Emitted after column resizing. Useful for retrieving the resized
    columns. Contains a JSON-safe event envelope.

- aftercolumnsset (dict; optional):
    Column updated Contains a JSON-safe event envelope.

- afteredit (dict; optional):
    After data applied or range changed. Contains a JSON-safe event
    envelope.

- afterfocus (dict; optional):
    After focus render finished. Can be used to access a focus element
    through `event.target`. This is just a duplicate of `afterfocus`
    from `revogr-focus.tsx`. Contains a JSON-safe event envelope.

- aftergridinit (dict; optional):
    Emmited after the grid is initialized. Connected to the DOM.
    Contains a JSON-safe event envelope.

- aftergridrender (dict; optional):
    Emmited after the grid is rendered. Contains a JSON-safe event
    envelope.

- aftersortingapply (dict; optional):
    By `SortingPlugin` <br>Triggered after sorting has been applied
    and completed. <br>Provides final sorting state and sorting column
    metadata when available. Contains a JSON-safe event envelope.

- aftersourceset (dict; optional):
    After main source/rows updated Contains a JSON-safe event
    envelope.

- afterthemechanged (dict; optional):
    Emmited after the theme is changed Contains a JSON-safe event
    envelope.

- aftertrimmed (dict; optional):
    Emitted after trimmed values have been applied. Useful for
    notifying when trimming of values has taken place. Contains a
    JSON-safe event envelope.

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

- beforeanysource (dict; optional):
    Before data apply on any source type. Can be source from pinned
    and main viewport. You can override data source here Contains a
    JSON-safe event envelope.

- beforeautofill (dict; optional):
    Before autofill is applied. To prevent the default behavior of
    applying the edit data, you can call `e.preventDefault()`.
    Contains a JSON-safe event envelope.

- beforecellfocus (dict; optional):
    Before the cell focus is changed. To prevent the default behavior
    of changing the cell focus, you can call `e.preventDefault()`.
    Contains a JSON-safe event envelope.

- beforecolumnapplied (dict; optional):
    Emitted before a column update is applied, after the column set is
    gathered and the viewport is updated. Useful for performing
    actions or modifications before the final application of the
    column update. Contains a JSON-safe event envelope.

- beforecolumnsgather (dict; optional):
    Emitted before user column definitions are gathered into the
    internal column collection. Listeners can replace `detail.columns`
    to rewrite the raw column set before RevoGrid normalizes it.
    Contains a JSON-safe event envelope.

- beforecolumnsset (dict; optional):
    Emitted before a column update is applied. Listeners can use this
    event to perform any necessary actions or modifications before the
    column update is finalized. Contains a JSON-safe event envelope.

- beforeedit (dict; optional):
    Before the data is edited. To prevent the default behavior of
    editing data and use your own implementation, call
    `e.preventDefault()`. To override the edit result with your own
    value, set the `e.val` property to your desired value. Contains a
    JSON-safe event envelope.

- beforeeditstart (dict; optional):
    Emitted before editing starts. Use e.preventDefault() to prevent
    the default edit behavior. Contains a JSON-safe event envelope.

- beforeexport (dict; optional):
    Before export Use e.preventDefault() to prevent export Replace
    data in Event in case you want to modify it in export Contains a
    JSON-safe event envelope.

- beforefilterapply (dict; optional):
    Emitted before applying a filter to the data source. Use
    e.preventDefault() to prevent cell focus change. Modify if you
    need to change filters. Contains a JSON-safe event envelope.

- beforefiltertrimmed (dict; optional):
    Emitted before applying a filter to the data source. Use
    e.preventDefault() to prevent the default behavior of trimming
    values and applying the filter. Modify the `collection` property
    if you want to change the filters. Modify the `itemsToFilter`
    property if you want to filter the indexes for trimming. Contains
    a JSON-safe event envelope.

- beforefocuslost (dict; optional):
    Before the grid focus is lost. To prevent the default behavior of
    changing the cell focus, you can call `e.preventDefault()`.
    Contains a JSON-safe event envelope.

- beforegridrender (dict; optional):
    Emmited before the grid is rendered. Contains a JSON-safe event
    envelope.

- beforerange (dict; optional):
    Before autofill is applied. Runs before beforeautofill event. Use
    e.preventDefault() to prevent range. Contains a JSON-safe event
    envelope.

- beforerangeedit (dict; optional):
    Before applying range data, specifically when a range selection
    occurs. To customize the data and prevent the default edit data
    from being set, you can call `e.preventDefault()`. Contains a
    JSON-safe event envelope.

- beforerowdefinition (dict; optional):
    Emitted before the row definition is applied. Useful for modifying
    or preventing the default row definition behavior. Contains a
    JSON-safe event envelope.

- beforesorting (dict; optional):
    By `SortingPlugin` <br>Triggered immediately after header click.
    <br>First in sorting event sequence. Ff this event stops no other
    event called. <br>Use `e.preventDefault()` to prevent sorting.
    Contains a JSON-safe event envelope.

- beforesortingapply (dict; optional):
    By `SortingPlugin` <br> After `beforesorting` <br>Triggered after
    column data updated with new sorting order. <br>Use
    `e.preventDefault()` to prevent sorting data change. Contains a
    JSON-safe event envelope.

- beforesourceset (dict; optional):
    Before main source/rows data apply. You can override data source
    here Contains a JSON-safe event envelope.

- beforesourcesortingapply (dict; optional):
    By `SortingPlugin` <br>Same as `beforesorting` but triggered after
    `beforeanysource` (when source is changed). <br>Use
    `e.preventDefault()` to prevent sorting data change. Contains a
    JSON-safe event envelope.

- beforetrimmed (dict; optional):
    Emitted before trimming values. Use e.preventDefault() to prevent
    the default behavior of trimming values. Modify the `trimmed`
    property if you want to filter the indexes for trimming. Contains
    a JSON-safe event envelope.

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

- contentsizechanged (dict; optional):
    New content size has been applied. The size excludes the header.
    Currently, the event responsible for applying the new content size
    does not provide the actual size. To retrieve the actual content
    size, you can utilize the `getContentSize` function after the
    event has been triggered. Contains a JSON-safe event envelope.

- created (dict; optional):
    Emmited after grid created Contains a JSON-safe event envelope.

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

- filterconfigchanged (dict; optional):
    Emitted when the filter configuration is changed Contains a
    JSON-safe event envelope.

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

- rowdragstart (dict; optional):
    This event is triggered when the row order change is started. To
    prevent the default behavior of changing the row order, you can
    call `e.preventDefault()`. To change the item name at the start of
    the row order change, you can set `e.text` to the desired new
    name. Contains a JSON-safe event envelope.

- rowheaderschanged (dict; optional):
    Emmited when the row headers are changed. Contains a JSON-safe
    event envelope.

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

- sortingconfigchanged (dict; optional):
    Emitted when the sorting configuration is changed SortingPlugin
    subsribed to this event Contains a JSON-safe event envelope.

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

- viewportscroll (dict; optional):
    Emitted when the viewport is scrolled. Useful for tracking
    viewport scrolling events. Contains a JSON-safe event envelope.

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
        additionaldatachanged: typing.Optional[dict] = None,
        afteranysource: typing.Optional[dict] = None,
        aftercolumnresize: typing.Optional[dict] = None,
        aftercolumnsset: typing.Optional[dict] = None,
        afteredit: typing.Optional[dict] = None,
        afterfocus: typing.Optional[dict] = None,
        aftergridinit: typing.Optional[dict] = None,
        aftergridrender: typing.Optional[dict] = None,
        aftersortingapply: typing.Optional[dict] = None,
        aftersourceset: typing.Optional[dict] = None,
        afterthemechanged: typing.Optional[dict] = None,
        aftertrimmed: typing.Optional[dict] = None,
        beforeanysource: typing.Optional[dict] = None,
        beforeautofill: typing.Optional[dict] = None,
        beforecellfocus: typing.Optional[dict] = None,
        beforecolumnapplied: typing.Optional[dict] = None,
        beforecolumnsgather: typing.Optional[dict] = None,
        beforecolumnsset: typing.Optional[dict] = None,
        beforeedit: typing.Optional[dict] = None,
        beforeeditstart: typing.Optional[dict] = None,
        beforeexport: typing.Optional[dict] = None,
        beforefilterapply: typing.Optional[dict] = None,
        beforefiltertrimmed: typing.Optional[dict] = None,
        beforefocuslost: typing.Optional[dict] = None,
        beforegridrender: typing.Optional[dict] = None,
        beforerange: typing.Optional[dict] = None,
        beforerangeedit: typing.Optional[dict] = None,
        beforerowdefinition: typing.Optional[dict] = None,
        beforesorting: typing.Optional[dict] = None,
        beforesortingapply: typing.Optional[dict] = None,
        beforesourceset: typing.Optional[dict] = None,
        beforesourcesortingapply: typing.Optional[dict] = None,
        beforetrimmed: typing.Optional[dict] = None,
        contentsizechanged: typing.Optional[dict] = None,
        created: typing.Optional[dict] = None,
        filterconfigchanged: typing.Optional[dict] = None,
        headerclick: typing.Optional[dict] = None,
        rowdragstart: typing.Optional[dict] = None,
        rowheaderschanged: typing.Optional[dict] = None,
        roworderchanged: typing.Optional[dict] = None,
        sortingconfigchanged: typing.Optional[dict] = None,
        viewportscroll: typing.Optional[dict] = None,
        eventListeners: typing.Optional[typing.Sequence[str]] = None,
        eventData: typing.Optional[dict] = None,
        syncSourceOnEdit: typing.Optional[bool] = None,
        **kwargs
    ):
        self._prop_names = ['id', 'accessible', 'additionalData', 'additionaldatachanged', 'afteranysource', 'aftercolumnresize', 'aftercolumnsset', 'afteredit', 'afterfocus', 'aftergridinit', 'aftergridrender', 'aftersortingapply', 'aftersourceset', 'afterthemechanged', 'aftertrimmed', 'applyOnClose', 'autoSizeColumn', 'beforeanysource', 'beforeautofill', 'beforecellfocus', 'beforecolumnapplied', 'beforecolumnsgather', 'beforecolumnsset', 'beforeedit', 'beforeeditstart', 'beforeexport', 'beforefilterapply', 'beforefiltertrimmed', 'beforefocuslost', 'beforegridrender', 'beforerange', 'beforerangeedit', 'beforerowdefinition', 'beforesorting', 'beforesortingapply', 'beforesourceset', 'beforesourcesortingapply', 'beforetrimmed', 'canDrag', 'canFocus', 'canMoveColumns', 'className', 'colSize', 'columnTypes', 'columns', 'contentsizechanged', 'created', 'disableVirtualX', 'disableVirtualY', 'eventData', 'eventListeners', 'exporting', 'filter', 'filterconfigchanged', 'frameSize', 'grouping', 'headerclick', 'hideAttribution', 'noHorizontalScrollTransfer', 'pinnedBottomSource', 'pinnedTopSource', 'range', 'readonly', 'resize', 'rowClass', 'rowDefinitions', 'rowHeaders', 'rowSize', 'rowdragstart', 'rowheaderschanged', 'roworderchanged', 'rtl', 'sorting', 'sortingconfigchanged', 'source', 'stretch', 'style', 'syncSourceOnEdit', 'theme', 'trimmedRows', 'useClipboard', 'viewportscroll', 'virtualX']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'accessible', 'additionalData', 'additionaldatachanged', 'afteranysource', 'aftercolumnresize', 'aftercolumnsset', 'afteredit', 'afterfocus', 'aftergridinit', 'aftergridrender', 'aftersortingapply', 'aftersourceset', 'afterthemechanged', 'aftertrimmed', 'applyOnClose', 'autoSizeColumn', 'beforeanysource', 'beforeautofill', 'beforecellfocus', 'beforecolumnapplied', 'beforecolumnsgather', 'beforecolumnsset', 'beforeedit', 'beforeeditstart', 'beforeexport', 'beforefilterapply', 'beforefiltertrimmed', 'beforefocuslost', 'beforegridrender', 'beforerange', 'beforerangeedit', 'beforerowdefinition', 'beforesorting', 'beforesortingapply', 'beforesourceset', 'beforesourcesortingapply', 'beforetrimmed', 'canDrag', 'canFocus', 'canMoveColumns', 'className', 'colSize', 'columnTypes', 'columns', 'contentsizechanged', 'created', 'disableVirtualX', 'disableVirtualY', 'eventData', 'eventListeners', 'exporting', 'filter', 'filterconfigchanged', 'frameSize', 'grouping', 'headerclick', 'hideAttribution', 'noHorizontalScrollTransfer', 'pinnedBottomSource', 'pinnedTopSource', 'range', 'readonly', 'resize', 'rowClass', 'rowDefinitions', 'rowHeaders', 'rowSize', 'rowdragstart', 'rowheaderschanged', 'roworderchanged', 'rtl', 'sorting', 'sortingconfigchanged', 'source', 'stretch', 'style', 'syncSourceOnEdit', 'theme', 'trimmedRows', 'useClipboard', 'viewportscroll', 'virtualX']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(RevoGrid, self).__init__(**args)

setattr(RevoGrid, "__init__", _explicitize_args(RevoGrid.__init__))
