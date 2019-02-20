import {createNode, Node} from "river-core";

export type In<V> = {
  /**
   * Value to be forwarded.
   */
  d_val: V;
};

export type Out<V> = {
  /**
   * Forwarded input value.
   */
  d_val: V;
};

/**
 * Forwards input value unconditionally.
 * @example
 * river = require("river-core");
 * noop = river.createNoop();
 * river.connect(noop.o.d_val, console.log);
 * noop.i.d_val(5); // logs: 5
 */
export type Noop<V> = Node<In<V>, Out<V>>;

/**
 * Creates a Noop node.
 */
export function createNoop<V>(): Noop<V> {
  return createNode<In<V>, Out<V>>(["d_val"], (outputs) => {
    return {
      d_val: (value, tag) => {
        outputs.d_val(value, tag);
      }
    };
  });
}
