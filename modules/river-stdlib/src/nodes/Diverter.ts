import {createOutPorts, createOutputs, InPorts, Node} from "@protoboard/river";

export type Inputs<P extends string | number, V> = {
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

export type Outputs<P extends string | number, V> =
  SwitchPositions<P, V> & { b_st_pos: P; };

/**
 * Forwards input value to one of the output ports, depending on the
 * node's current 'position' state.
 * Operates with either independent or joined inputs.
 * @example
 * river = require("@protoboard/river");
 * diverter = river.createDiverter(["foo", "bar"]);
 * river.connect(diverter.o.foo, console.log);
 * diverter.i.st_pos("foo");
 * diverter.i.d_val("a"); // logs: "a"
 */
export type Diverter<P extends string | number, V> =
  Node<Inputs<P, V> & { all: Inputs<P, V> }, Outputs<P, V>>;

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
  const o = createOutPorts((<Array<keyof Outputs<P, V>>>positions).concat("b_st_pos"));
  const outputs = createOutputs<Outputs<P, V>>(o);

  const positionSet = new Set(positions);

  const i: InPorts<Inputs<P, V> & { all: Inputs<P, V> }> = {
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

  return {i, o};
}
