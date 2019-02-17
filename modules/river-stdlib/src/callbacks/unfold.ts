import {UnfolderCallback} from "../nodes";

/**
 * Unfolds array by popping values out of it.
 * @param value
 */
export function* unfoldPop(value: Array<any>): any {
  value = value.slice();
  while (value.length > 0) {
    yield value.pop();
  }
}

/**
 * Unfolds array by unshifting values out of it.
 * @param value
 */
export function* unfoldShift(value: Array<any>): any {
  value = value.concat();
  while (value.length > 0) {
    yield value.shift();
  }
}

/**
 * Creates a generator function that unfolds a string by splitting it along
 * the specified delimiter.
 * @param delimiter
 */
export function unfoldSplit(delimiter: string): UnfolderCallback<string, string> {
  let fragment = "";
  return function* (value: string) {
    const items = (fragment + value).split(delimiter);
    fragment = items.pop();
    for (const item of items) {
      yield item;
    }
  };
}
