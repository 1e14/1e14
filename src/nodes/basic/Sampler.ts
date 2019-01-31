import {INode, TInPorts} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";

export interface IInputs<V> {
  /**
   * Value to be sampled.
   */
  d_val: V;

  /**
   * Sampling signal.
   */
  ev_smp: any;
}

export interface IOutputs<V> {
  /**
   * Sampled input value.
   */
  d_val: V;
}

/**
 * Forwards last input value on receiving a sampling signal.
 */
export type TSampler<V> = INode<IInputs<V>, IOutputs<V>>;

/**
 * Creates a Sampler node.
 */
export function createSampler<V>() {
  const o = createOutPorts(["d_val"]);
  const outputs = createOutputs(o);

  let input: V;

  const i: TInPorts<IInputs<V>> = {
    d_val: (value) => {
      input = value;
    },

    ev_smp: (value, tag) => {
      outputs.d_val(input, tag);
    }
  };

  return {i, o};
}
