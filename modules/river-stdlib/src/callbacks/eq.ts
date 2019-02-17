import {EqualityCallback} from "../nodes";

/**
 * Creates an equality callback that checks whether the specified property
 * of the arguments are equal, according to an optional equality callback.
 * @param name Property name.
 * @param cb Optional equality callback.
 */
export function eqProperty<I>(
  name: string,
  cb?: EqualityCallback<I[keyof I]>
): EqualityCallback<I> {
  return cb ?
    (a, b) => {
      return a && b && cb(a[name], b[name]);
    } :
    (a, b) => {
      return a && b && a[name] === b[name];
    };
}
