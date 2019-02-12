import {INode, TInPorts} from "../node";
import {createOutPorts, createOutputs} from "../utils";

export interface IInputs<V> {
  /**
   * Value to be delayed.
   */
  d_val: V;
}

export interface IOutputs<V> {
  /**
   * Delayed value.
   */
  d_val: V;
}

/**
 * Forwards input value with the specified delay.
 * @example
 * river = require("@protoboard/river");
 * delayer = river.createDelayer(1000);
 * river.connect(delayer.o.d_val, console.log);
 * delayer.i.d_val("a"); // logs after 1 second: "a"
 */
export type TDelayer<V> = INode<IInputs<V>, IOutputs<V>>;

/**
 * Creates a Delayer node.
 * @param ms Number of milliseconds between receiving and forwarding input.
 */
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
