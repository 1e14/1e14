import {createOutPorts, createOutputs, INode, TInPorts} from "@protoboard/river";

export interface IInputs<V> {
  /**
   * Value to be forwarded.
   */
  d_val: V;
}

export interface IOutputs<V> {
  /**
   * Forwarded input value.
   */
  d_val: V;
}

/**
 * Forwards input value unconditionally.
 * @example
 * river = require("@protoboard/river");
 * noop = river.createNoop();
 * river.connect(noop.o.d_val, console.log);
 * noop.i.d_val(5); // logs: 5
 */
export type TNoop<V> = INode<IInputs<V>, IOutputs<V>>;

/**
 * Creates a Noop node.
 */
export function createNoop<V>(): TNoop<V> {
  const o = createOutPorts(["d_val"]);
  const outputs = createOutputs(o);

  const i: TInPorts<IInputs<V>> = {
    d_val: (value, tag) => {
      outputs.d_val(value, tag);
    }
  };

  return {i, o};
}
