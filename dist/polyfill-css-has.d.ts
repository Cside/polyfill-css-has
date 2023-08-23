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
export default function querySelectorAllWithHas(selector: string, dom?: Element): Node[];
/**
 * Get the inner-selector from the :has() statement.
 * Returns false if no :has() is present.
 *
 * @param selector A CSS selector possibly containing :has()
 */
export declare function getHasInnerSelector(selector: string): string | Boolean;
/**
 * Get the elements in the resolved scope prior to the :has() statement.
 *
 * @param dom       Element
 * @param selector  Selector
 */
export declare function getNodesInCurrentScope(dom: Element | Document, selector: string): NodeList;
/**
 * Perform the querySelectorAll behavior against the nodes at the top level.
 *
 * @param nodes     Filtered nodes from the prior scope.
 * @param selector  The inner :has() selector
 */
export declare function filterNodesInScopeByHasSelector(nodes: NodeList, selector: string): Node[];
