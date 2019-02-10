import {INode, TInPorts} from "../node";
import {createOutPorts, createOutputs} from "../utils";

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
 * mote = require("@kwaia/mote");
 * noop = mote.createNoop();
 * mote.connect(noop.o.d_val, console.log);
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
