import {TUnfolderCallback} from "../nodes/basic";

export function* unfoldPop(value: Array<any>): any {
  value = value.slice();
  while (value.length > 0) {
    yield value.pop();
  }
}

export function* unfoldShift(value: Array<any>): any {
  value = value.concat();
  while (value.length > 0) {
    yield value.shift();
  }
}

export function unfoldSplit(delimiter: string): TUnfolderCallback<string, string> {
  let fragment = "";
  return function* (value: string) {
    const items = (fragment + value).split(delimiter);
    fragment = items.pop();
    for (const item of items) {
      yield item;
    }
  };
}
