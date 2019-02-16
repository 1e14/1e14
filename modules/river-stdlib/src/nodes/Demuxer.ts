import {createOutPorts, createOutputs, INode, TInPorts} from "@protoboard/river";
import {IMuxed} from "../utils";

export interface IInputs<T> {
  /**
   * Multiplexed input value.
   */
  d_mux: IMuxed<T>;
}

export type TOutputs<T> = T;

/**
 * De-multiplexes input value.
 * Forwards de-multiplexed input values to corresponding output ports.
 * @example
 * river = require("@protoboard/river");
 * demuxer = river.createDemuxer(["foo", "bar"]);
 * river.connect(demuxer.o.foo, console.log);
 * demuxer.i.d_mux({field: "foo", value: "a"}); // logs: "a"
 */
export type TDemuxer<T> = INode<IInputs<T>, TOutputs<T>>;

/**
 * Creates a Demuxer node.
 * @param fields List of output fields.
 */
export function createDemuxer<T>(fields: Array<keyof T>): TDemuxer<T> {
  const o = createOutPorts(fields);
  const outputs = createOutputs(o);

  const i: TInPorts<IInputs<T>> = {
    d_mux: ({field, value}, tag) => {
      outputs[field](value, tag);
    }
  };

  return {i, o};
}
