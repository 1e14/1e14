import {createOutPorts, createOutputs, InPorts, Node} from "@protoboard/river";
import {Muxed} from "../utils";

export type Inputs<T> = T;

export type Outputs<T> = {
  /**
   * Multiplexed input value.
   */
  d_mux: Muxed<T>;
};

/**
 * Multiplexes input value.
 * Forwards multiplexed input value to a single output port.
 * @example
 * river = require("@protoboard/river");
 * muxer = river.createMuxer(["foo", "bar"]);
 * river.connect(muxer.o.d_mux, console.log);
 * muxer.i.foo("a"); // logs: {field: "foo", value: "a"}
 */
export type Muxer<T> = Node<Inputs<T>, Outputs<T>>;

/**
 * Creates a Muxer node.
 * @param fields List of input fields.
 */
export function createMuxer<T>(fields: Array<keyof T>): Muxer<T> {
  const o = createOutPorts(["d_mux"]);
  const outputs = createOutputs(o);

  const i = <InPorts<Inputs<T>>>{};

  for (const field of fields) {
    i[field] = (value, tag) => {
      outputs.d_mux({field, value}, tag);
    };
  }

  return {i, o};
}
