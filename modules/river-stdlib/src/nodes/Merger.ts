import {createOutPorts, createOutputs, InPorts, Node} from "@protoboard/river";
import {copy} from "../utils";
import {Outputs as DemuxerOutputs} from "./Demuxer";

export type Inputs<T> = T;

export type Outputs<T> = {
  /**
   * Merged inputs.
   */
  all: T;
};

/**
 * Merges last input values from all ports.
 * @example
 * river = require("@protoboard/river");
 * merger = river.createMerger(["foo", "bar"]);
 * river.connect(merger.o.all, console.log);
 * merger.i.foo("a"); // logs: {foo: "a"}
 * merger.i.foo("b"); // logs: {foo: "b"}
 * merger.i.bar("c"); // logs: {foo: "b", bar: "c"}
 */
export type Merger<T> = Node<Inputs<T>, Outputs<T>>;

/**
 * Creates a Merger node.
 * @param fields List of input fields.
 */
export function createMerger<T>(fields: Array<keyof T>): Merger<T> {
  const o = createOutPorts(["all"]);
  const outputs = createOutputs(o);

  const inputs = <DemuxerOutputs<T>>{};

  const i = <InPorts<Inputs<T>>>{};
  for (const field of fields) {
    i[field] = (value, tag) => {
      inputs[field] = value;
      outputs.all(copy(inputs), tag);
    };
  }

  return {i, o};
}
