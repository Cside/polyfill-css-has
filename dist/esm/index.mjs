/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cc: () => (/* binding */ getNodesInCurrentScope),
/* harmony export */   Iw: () => (/* binding */ filterNodesInScopeByHasSelector),
/* harmony export */   ZP: () => (/* binding */ querySelectorAllWithHas),
/* harmony export */   lD: () => (/* binding */ getHasInnerSelector)
/* harmony export */ });
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

var __webpack_exports__default = __webpack_exports__.ZP;
var __webpack_exports__filterNodesInScopeByHasSelector = __webpack_exports__.Iw;
var __webpack_exports__getHasInnerSelector = __webpack_exports__.lD;
var __webpack_exports__getNodesInCurrentScope = __webpack_exports__.Cc;
export { __webpack_exports__default as default, __webpack_exports__filterNodesInScopeByHasSelector as filterNodesInScopeByHasSelector, __webpack_exports__getHasInnerSelector as getHasInnerSelector, __webpack_exports__getNodesInCurrentScope as getNodesInCurrentScope };
