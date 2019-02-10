/**
 * Counts items.
 * Requires numeric initial value.
 * @param curr
 */

export function foldCount(curr: number) {
  return ++curr;
}

/**
 * Pushes next item to result array.
 * Requires array initial value.
 * @param curr
 * @param next
 */
export function foldPush(curr: Array<any>, next: any): Array<any> {
  curr.push(next);
  return curr;
}

/**
 * Unshifts next item to result array.
 * Requires array initial value.
 * @param curr
 * @param next
 */
export function foldUnshift(curr: Array<any>, next: any): Array<any> {
  curr.unshift(next);
  return curr;
}

/**
 * Concatenates next item to array.
 * @param curr
 * @param next
 */
export function foldConcat(curr: Array<any>, next: Array<any>): Array<any> {
  return curr.concat(next);
}

/**
 * Selects first item.
 * @param curr
 */
export function foldFirst(curr: any): any {
  return curr;
}

/**
 * Selects last item.
 * @param curr
 * @param next
 */
export function foldLast(curr: any, next: any): any {
  return next;
}

/**
 * Concatenates items.
 * @param curr
 * @param next
 */
export function foldAdd(curr: string, next: string): string;

/**
 * Sums items.
 * @param curr
 * @param next
 */
export function foldAdd(curr: number, next: number): string;

export function foldAdd(curr: any, next: any): any {
  return curr + next;
}

/**
 * Selects lowest item.
 * TODO: Make generic w/ comparer callback.
 * @param curr
 * @param next
 */
export function foldMin(curr: number, next: number): number {
  return next < curr ? next : curr;
}

/**
 * Selects highest item.
 * TODO: Make generic w/ comparer callback.
 * @param curr
 * @param next
 */
export function foldMax(curr: number, next: number): number {
  return next > curr ? next : curr;
}
