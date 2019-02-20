import {createNode, Node} from "river-core";

export type In<V> = {
  /**
   * Value to be sampled.
   */
  d_val: V;

  /**
   * Sampling signal.
   */
  ev_smp: any;
};

export type Out<V> = {
  /**
   * Sampled input value.
   */
  d_val: V;
};

/**
 * Forwards last input value on receiving a sampling signal.
 * @example
 * river = require("river-core");
 * sampler = river.createSampler();
 * river.connect(sampler.o.d_val, console.log);
 * sampler.i.d_val(5);
 * sampler.i.d_val(3);
 * sampler.i.ev_smp(); // logs: 3
 */
export type Sampler<V> = Node<In<V>, Out<V>>;

/**
 * Creates a Sampler node.
 */
export function createSampler<V>() {
  return createNode<In<V>, Out<V>>(["d_val"], (outputs) => {
    let input: V;
    return {
      d_val: (value) => {
        input = value;
      },

      ev_smp: (value, tag) => {
        outputs.d_val(input, tag);
      }
    };
  });
}
