import {createNode, Node} from "1e14";

export type In<P extends string, V> = {
  /** Value to be forwarded. */
  d_val: V;

  /** Active output. */
  st_pos: P;
};

export type Out<P extends string, V> = {
  [K in P]: V;
};

/**
 * Forwards input value to one of the output ports, depending on the
 * node's current 'position' state.
 * Operates with either independent or joined inputs.
 */
export type Switcher<P extends string, V> =
  Node<In<P, V> & { all: In<P, V> }, Out<P, V>>;

/**
 * Creates a Switcher node.
 * @param positions List of all possible positions.
 * @param position Initial 'position' state.
 */
export function createSwitcher<P extends string, V>(
  positions: Array<P>,
  position?: P
): Switcher<P, V> {
  return createNode<In<P, V> & { all: In<P, V> }, Out<P, V>>
  (positions, (outputs) => {
    return {
      all: ({d_val, st_pos}, tag) => {
        position = st_pos;
        outputs[position](<any>d_val, tag);
      },

      d_val: (value, tag) => {
        outputs[position](<any>value, tag);
      },

      st_pos: (value) => {
        position = value;
      }
    };
  });
}
