export function count(curr: number) {
  return ++curr;
}

export function push(curr: Array<any>, next: any): Array<any> {
  curr.push(next);
  return curr;
}

export function unshift(curr: Array<any>, next: any): Array<any> {
  curr.unshift(next);
  return curr;
}

export function concat(curr: Array<any>, next: Array<any>): Array<any> {
  return curr.concat(next);
}

export function last(curr: any, next: any): any {
  return next;
}

export function join(curr: string, next: string): string {
  return curr + next;
}

export function sum(curr: number, next: number): number {
  return curr + next;
}

export function min(curr: number, next: number): number {
  return next < curr ? next : curr;
}

export function max(curr: number, next: number): number {
  return next > curr ? next : curr;
}
