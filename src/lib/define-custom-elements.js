import { defineCustomElement as defineRevoGrid } from '@revolist/revogrid/standalone/revo-grid.js';
import { defineCustomElement as defineFilterPanel } from '@revolist/revogrid/standalone/revogr-filter-panel.js';

/**
 * Registers RevoGrid and the filter panel created dynamically by its core
 * filter plugin. The root standalone definition registers the remaining
 * compiler-discovered RevoGrid dependencies.
 */
export function defineCustomElement() {
  defineFilterPanel();
  defineRevoGrid();
}
