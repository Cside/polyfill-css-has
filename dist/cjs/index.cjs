/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.filterNodesInScopeByHasSelector = exports.getNodesInCurrentScope = exports.getHasInnerSelector = void 0;
/**
 * Perform querySelectorAll using the experimental :has() selector, as
 * defined by MDN.
 *
 * @example
 * const results = querySelectorAll('.container > div:has(> img)');
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/:has
 * @param selector CSS selector containing :has()
 * @param dom      Optional element to search. Defaults to document.
 */
function querySelectorAllWithHas(selector, dom) {
    const node = dom || document;
    const hasSelector = getHasInnerSelector(selector);
    if (!hasSelector) {
        return Array.from(node.querySelectorAll(selector));
    }
    const nodes = getNodesInCurrentScope(node, selector);
    return filterNodesInScopeByHasSelector(nodes, hasSelector);
}
exports["default"] = querySelectorAllWithHas;
/**
 * Get the inner-selector from the :has() statement.
 * Returns false if no :has() is present.
 *
 * @param selector A CSS selector possibly containing :has()
 */
function getHasInnerSelector(selector) {
    const matches = /:has\((.*)\)/.exec(selector);
    if (!matches) {
        return false;
    }
    return matches[1];
}
exports.getHasInnerSelector = getHasInnerSelector;
/**
 * Get the elements in the resolved scope prior to the :has() statement.
 *
 * @param dom       Element
 * @param selector  Selector
 */
function getNodesInCurrentScope(dom, selector) {
    const currentScopeSelector = getCurrentScopeSelector(selector);
    return dom.querySelectorAll(currentScopeSelector);
}
exports.getNodesInCurrentScope = getNodesInCurrentScope;
/**
 * Grab the top-level scope, immediately to the left of :has()
 *
 * @param selector
 */
function getCurrentScopeSelector(selector) {
    return selector.slice(0, selector.indexOf(':has('));
}
/**
 * Perform the querySelectorAll behavior against the nodes at the top level.
 *
 * @param nodes     Filtered nodes from the prior scope.
 * @param selector  The inner :has() selector
 */
function filterNodesInScopeByHasSelector(nodes, selector) {
    let method;
    method = selectorHasDirectDescendant(selector)
        ? filterNodeWithDirectDescendants
        : filterNode;
    return Array.from(nodes).filter(node => method(node, selector));
}
exports.filterNodesInScopeByHasSelector = filterNodesInScopeByHasSelector;
function selectorHasDirectDescendant(selector) {
    return selector.trim().slice(0, 1) === '>';
}
function scrubDirectDescendantFromSelector(selector) {
    return selector
        .trim()
        .slice(1)
        .trim();
}
function filterNode(node, selector) {
    return !!node.querySelector(selector);
}
function filterNodeWithDirectDescendants(node, selector) {
    return Array.from(node.children).some(child => {
        return child.matches(scrubDirectDescendantFromSelector(selector));
    });
}

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;