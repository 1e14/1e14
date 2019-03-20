import {createNode, Node} from "../../../1e14";

export type In<V> = {
  /**
   * Value to be shifted.
   */
  d_val: V;
};

export type Out<V> = {
  /**
   * Shifted input value.
   */
  d_val: V;
};

/**
 * Shifts input back by one in impulse domain.
 * @example
 * import {connect, createShifter} from "river-stdlib";
 * const shifter = createShifter();
 * connect(shifter.o.d_val, console.log);
 * shifter.i.d_val(5); // logs: undefined
 * shifter.i.d_val(3); // logs: 5
 * shifter.i.d_val(4); // logs: 3
 */
export type Shifter<V> = Node<In<V>, Out<V>>;

/**
 * Creates a Shifter node.
 */
export function createShifter<V>(): Shifter<V> {
  return createNode<In<V>, Out<V>>(["d_val"], (outputs) => {
    let last: V;
    return {
      d_val: (value, tag) => {
        outputs.d_val(last, tag);
        last = value;
      }
    };
  });
}
