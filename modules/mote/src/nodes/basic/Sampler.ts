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
 * @example
 * mote = require("@kwaia/mote");
 * sampler = mote.createSampler();
 * mote.connect(sampler.o.d_val, console.log);
 * sampler.i.d_val(5);
 * sampler.i.d_val(3);
 * sampler.i.ev_smp(); // logs: 3
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
