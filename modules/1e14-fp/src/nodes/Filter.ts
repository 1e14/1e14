import {createNode, Node} from "1e14";
import {FilterCallback} from "../types";

export type In<V> = {
  /**
   * Value to be filtered.
   */
  d_val: V;
};

export type Out<V> = {
  /**
   * Forwarded value.
   */
  d_val: V;
};

/**
 * Filters input values according to a filter callback.
 * @link https://github.com/1e14/1e14/wiki/Filter
 */
export type Filter<V> = Node<In<V>, Out<V>>;

/**
 * Creates a Filter node.
 * @param cb Filter callback.
 */
export function createFilter<V>(cb: FilterCallback<V>): Filter<V> {
  return createNode<In<V>, Out<V>>
  (["d_val"], (outputs) => {
    const o_d_val = outputs.d_val;
    return {
      d_val: (value, tag) => {
        if (cb(value, tag)) {
          o_d_val(value, tag);
        }
      }
    };
  });
}
