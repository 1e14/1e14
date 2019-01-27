import {INode, TInPorts, TTag} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";

export interface IInputs<V> {
  d_val: V;
  r_tag: any;
}

export interface IOutputs<V> {
  d_val: V;
}

export type TSerializer<V> = INode<IInputs<V>, IOutputs<V>>;

export function createSerializer<V>(): TSerializer<V> {
  const o = createOutPorts(["d_val"]);
  const outputs = createOutputs(o);

  const values: Map<TTag, V> = new Map();
  const order: Array<TTag> = [];

  const i: TInPorts<IInputs<V>> = {
    d_val: (value, tag) => {
      values.set(tag, value);
      flush();
    },

    r_tag: (value, tag) => {
      order.push(tag);
      flush();
    }
  };

  function flush() {
    while (values.has(order[0])) {
      const tag = order.shift();
      const value = values.get(tag);
      values.delete(tag);
      outputs.d_val(value, tag);
    }
  }

  return {i, o};
}
