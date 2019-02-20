import {createNode, Node} from "river-core";

export type In<P extends string | number, V> = {
  /**
   * Value to be diverted.
   */
  d_val: V;

  /**
   * Current position of the diverter.
   */
  st_pos: P;
};

export type SwitchPositions<P extends string | number, V> = {
  [K in P]: V;
};

export type Out<P extends string | number, V> =
  SwitchPositions<P, V> & { b_st_pos: P; };

/**
 * Forwards input value to one of the output ports, depending on the
 * node's current 'position' state.
 * Operates with either independent or joined inputs.
 * @example
 * river = require("river-core");
 * diverter = river.createDiverter(["foo", "bar"]);
 * river.connect(diverter.o.foo, console.log);
 * diverter.i.st_pos("foo");
 * diverter.i.d_val("a"); // logs: "a"
 */
export type Diverter<P extends string | number, V> =
  Node<In<P, V> & { all: In<P, V> }, Out<P, V>>;

/**
 * Creates a Diverter node.
 * TODO: Remove <any> typecasts once S supports string patterns in types
 * @link https://github.com/Microsoft/TypeScript/issues/12754
 * @param positions List of all possible positions.
 * @param position Initial position.
 */
export function createDiverter<P extends string | number, V>(
  positions: Array<P>,
  position?: P
): Diverter<P, V> {
  return createNode<In<P, V> & { all: In<P, V> }, Out<P, V>>
  ((<Array<keyof Out<P, V>>>positions).concat("b_st_pos"), (outputs) => {
    const positionSet = new Set(positions);

    return {
      all: ({d_val, st_pos}, tag) => {
        if (positionSet.has(st_pos)) {
          position = st_pos;
          outputs[position](<any>d_val, tag);
        } else {
          outputs.b_st_pos(<any>st_pos, tag);
        }
      },

      d_val: (value, tag) => {
        outputs[position](<any>value, tag);
      },

      st_pos: (value, tag) => {
        if (positionSet.has(value)) {
          position = value;
        } else {
          outputs.b_st_pos(<any>value, tag);
        }
      }
    };
  });
}
