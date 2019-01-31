import {INode, TInPorts} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";

export interface IInputs<V> {
  /**
   * Value to be shifted.
   */
  d_val: V;
}

export interface IOutputs<V> {
  /**
   * Shifted input value.
   */
  d_val: V;
}

/**
 * Shifts input back by one in impulse domain.
 */
export type TShifter<V> = INode<IInputs<V>, IOutputs<V>>;

/**
 * Creates a Shifter node.
 */
export function createShifter<V>(): TShifter<V> {
  const o = createOutPorts(["d_val"]);
  const outputs = createOutputs(o);

  let last: V;

  const i: TInPorts<IInputs<V>> = {
    d_val: (value, tag) => {
      outputs.d_val(last, tag);
      last = value;
    }
  };

  return {i, o};
}
