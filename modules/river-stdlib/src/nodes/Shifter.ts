import {createOutPorts, createOutputs, InPorts, Node} from "@protoboard/river";

export type Inputs<V> = {
  /**
   * Value to be shifted.
   */
  d_val: V;
};

export type Outputs<V> = {
  /**
   * Shifted input value.
   */
  d_val: V;
};

/**
 * Shifts input back by one in impulse domain.
 * @example
 * river = require("@protoboard/river");
 * shifter = river.createShifter();
 * river.connect(shifter.o.d_val, console.log);
 * shifter.i.d_val(5); // logs: undefined
 * shifter.i.d_val(3); // logs: 5
 * shifter.i.d_val(4); // logs: 3
 */
export type Shifter<V> = Node<Inputs<V>, Outputs<V>>;

/**
 * Creates a Shifter node.
 */
export function createShifter<V>(): Shifter<V> {
  const o = createOutPorts(["d_val"]);
  const outputs = createOutputs(o);

  let last: V;

  const i: InPorts<Inputs<V>> = {
    d_val: (value, tag) => {
      outputs.d_val(last, tag);
      last = value;
    }
  };

  return {i, o};
}
