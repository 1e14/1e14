import {TEqualityCallback} from "../nodes/basic";

export function eqProperty<I>(
  name: string,
  cb?: TEqualityCallback<I[keyof I]>
): TEqualityCallback<I> {
  return cb ?
    (a, b) => {
      return a && b && cb(a[name], b[name]);
    } :
    (a, b) => {
      return a && b && a[name] === b[name];
    };
}
