import {INode, TInPorts} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";

export interface IInputs<V> {
  d_val: V;
}

export interface IOutputs<V> {
  d_val: V;
}

export type TShifter<V> = INode<IInputs<V>, IOutputs<V>>;

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
