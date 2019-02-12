import {INode, TInPorts} from "../node";
import {createOutPorts, createOutputs, IMuxed} from "../utils";

export type TInputs<T> = T;

export interface IOutputs<T> {
  /**
   * Multiplexed input value.
   */
  d_mux: IMuxed<T>;
}

/**
 * Multiplexes input value.
 * Forwards multiplexed input value to a single output port.
 * @example
 * river = require("@protoboard/river");
 * muxer = river.createMuxer(["foo", "bar"]);
 * river.connect(muxer.o.d_mux, console.log);
 * muxer.i.foo("a"); // logs: {field: "foo", value: "a"}
 */
export type TMuxer<T> = INode<TInputs<T>, IOutputs<T>>;

/**
 * Creates a Muxer node.
 * @param fields List of input fields.
 */
export function createMuxer<T>(fields: Array<keyof T>): TMuxer<T> {
  const o = createOutPorts(["d_mux"]);
  const outputs = createOutputs(o);

  const i = <TInPorts<TInputs<T>>>{};

  for (const field of fields) {
    i[field] = (value, tag) => {
      outputs.d_mux({field, value}, tag);
    };
  }

  return {i, o};
}
