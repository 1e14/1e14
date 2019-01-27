export function foldCount(curr: number) {
  return ++curr;
}

export function foldPush(curr: Array<any>, next: any): Array<any> {
  curr.push(next);
  return curr;
}

export function foldUnshift(curr: Array<any>, next: any): Array<any> {
  curr.unshift(next);
  return curr;
}

export function foldConcat(curr: Array<any>, next: Array<any>): Array<any> {
  return curr.concat(next);
}

export function foldLast(curr: any, next: any): any {
  return next;
}

export function foldJoin(curr: string, next: string): string {
  return curr + next;
}

export function foldSum(curr: number, next: number): number {
  return curr + next;
}

export function foldMin(curr: number, next: number): number {
  return next < curr ? next : curr;
}

export function foldMax(curr: number, next: number): number {
  return next > curr ? next : curr;
}
