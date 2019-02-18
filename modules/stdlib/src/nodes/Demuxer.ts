import {createOutPorts, createOutputs, InPorts, Node} from "river-core";
import {Muxed} from "../types";

export type Inputs<T> = {
  /**
   * Multiplexed input value.
   */
  d_mux: Muxed<T>;
};

export type Outputs<T> = T;

/**
 * De-multiplexes input value.
 * Forwards de-multiplexed input values to corresponding output ports.
 * @example
 * river = require("river-core");
 * demuxer = river.createDemuxer(["foo", "bar"]);
 * river.connect(demuxer.o.foo, console.log);
 * demuxer.i.d_mux({field: "foo", value: "a"}); // logs: "a"
 */
export type Demuxer<T> = Node<Inputs<T>, Outputs<T>>;

/**
 * Creates a Demuxer node.
 * @param fields List of output fields.
 */
export function createDemuxer<T>(fields: Array<keyof T>): Demuxer<T> {
  const o = createOutPorts(fields);
  const outputs = createOutputs(o);

  const i: InPorts<Inputs<T>> = {
    d_mux: ({field, value}, tag) => {
      outputs[field](value, tag);
    }
  };

  return {i, o};
}
