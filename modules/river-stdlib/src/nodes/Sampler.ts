import {createOutPorts, createOutputs, InPorts, Node} from "@protoboard/river";

export type Inputs<V> = {
  /**
   * Value to be sampled.
   */
  d_val: V;

  /**
   * Sampling signal.
   */
  ev_smp: any;
};

export type Outputs<V> = {
  /**
   * Sampled input value.
   */
  d_val: V;
};

/**
 * Forwards last input value on receiving a sampling signal.
 * @example
 * river = require("@protoboard/river");
 * sampler = river.createSampler();
 * river.connect(sampler.o.d_val, console.log);
 * sampler.i.d_val(5);
 * sampler.i.d_val(3);
 * sampler.i.ev_smp(); // logs: 3
 */
export type Sampler<V> = Node<Inputs<V>, Outputs<V>>;

/**
 * Creates a Sampler node.
 */
export function createSampler<V>() {
  const o = createOutPorts(["d_val"]);
  const outputs = createOutputs(o);

  let input: V;

  const i: InPorts<Inputs<V>> = {
    d_val: (value) => {
      input = value;
    },

    ev_smp: (value, tag) => {
      outputs.d_val(input, tag);
    }
  };

  return {i, o};
}
