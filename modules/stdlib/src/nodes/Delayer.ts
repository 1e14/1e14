import {createOutPorts, createOutputs, InPorts, Node} from "river-core";

export type Inputs<V> = {
  /**
   * Value to be delayed.
   */
  d_val: V;
};

export type Outputs<V> = {
  /**
   * Delayed value.
   */
  d_val: V;
};

/**
 * Forwards input value with the specified delay.
 * @example
 * river = require("river-core");
 * delayer = river.createDelayer(1000);
 * river.connect(delayer.o.d_val, console.log);
 * delayer.i.d_val("a"); // logs after 1 second: "a"
 */
export type Delayer<V> = Node<Inputs<V>, Outputs<V>>;

/**
 * Creates a Delayer node.
 * @param ms Number of milliseconds between receiving and forwarding input.
 */
export function createDelayer<V>(ms: number): Delayer<V> {
  const o = createOutPorts(["d_val"]);
  const outputs = createOutputs(o);

  const i: InPorts<Inputs<V>> = {
    d_val: (value, tag) => {
      setTimeout(() => {
        outputs.d_val(value, tag);
      }, ms);
    }
  };

  return {i, o};
}
