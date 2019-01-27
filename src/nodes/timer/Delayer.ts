import {INode, TInPorts} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";

export interface IInputs<V> {
  d_val: V;
}

export interface IOutputs<V> {
  d_val: V;
}

export type TDelayer<V> = INode<IInputs<V>, IOutputs<V>>;

export function createDelayer<V>(ms: number): TDelayer<V> {
  const o = createOutPorts(["d_val"]);
  const outputs = createOutputs(o);

  const i: TInPorts<IInputs<V>> = {
    d_val: (value, tag) => {
      setTimeout(() => {
        outputs.d_val(value, tag);
      }, ms);
    }
  };

  return {i, o};
}
