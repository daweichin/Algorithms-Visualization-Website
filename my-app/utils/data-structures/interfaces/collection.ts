/**
 * POSD - Clean interface
 * Using https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array as a reference
 * as to which functions might be useful
 * JS Array.prototype accepts multiple elements. For simplicity, let's start with just one el at a time
 *
 * Represents an unordered collection.
 * @function push adds item to end
 * @function pop removes and returns first item
 * @function insertAt
 * @function removeAt
 */
export interface Collection<T> extends Iterable<T> {
  /**************************************************
   * Properties
   **************************************************/

  /**
   * length must be maintained correctly through the manipulation methods
   */
  length: number;

  /**************************************************
   * Manipulation Methods
   **************************************************/

  /**
   *  Add element to end of collection
   * @param item
   */
  push: (item: T) => void;

  /**
   *  Remove element from end of Collection, or undefined if Collection is empty
   */
  pop: () => T | undefined; //

  /**
   *  Remove element from front of Collection, or undefined if Collection is empty
   */
  shift: () => T | undefined;

  /**
   *  Add element to front of Collection
   * @param item
   */
  unshift: (item: T) => void; //

  /**
   *  Add element to any index in the collection
   * @param item
   */
  insertAt?: (item: T, index: number) => void;

  /**
   *  Remove element from any index
   * @param item
   */
  removeAt?: (index: number) => void;
}
