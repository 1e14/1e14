import {createNode, Node} from "1e14";

export type In<V> = {
  /**
   * Value to be forwarded.
   */
  d_val: V;

  /**
   * Whether gate is open.
   */
  st_open: boolean;
};

export type Out<V> = {
  /**
   * Forwarded value.
   */
  d_val: V;
};

/**
 * Forwards input value when gate is open.
 * Operates with either independent or joined inputs.
 * @link https://github.com/1e14/1e14/wiki/Gate
 */
export type Gate<V> = Node<In<V> & { all: In<V> }, Out<V>>;

/**
 * Creates a Gate node.
 * @param open Initial 'open' state.
 */
export function createGate<V>(open?: boolean): Gate<V> {
  return createNode<In<V> & { all: In<V> }, Out<V>>
  (["d_val"], (outputs) => {
    const o_d_val = outputs.d_val;
    return {
      all: ({d_val, st_open}, tag) => {
        if (st_open) {
          o_d_val(d_val, tag);
        }
      },

      d_val: (value, tag) => {
        if (open) {
          o_d_val(value, tag);
        }
      },

      st_open: (value) => {
        open = value;
      }
    };
  });
}
