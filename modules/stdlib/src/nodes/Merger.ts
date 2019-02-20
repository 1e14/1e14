import {createNode, InPorts, Node} from "river-core";
import {copy} from "../utils";
import {Out as DemuxerOutputs} from "./Demuxer";

export type In<T> = T;

export type Out<T> = {
  /**
   * Merged inputs.
   */
  all: T;
};

/**
 * Merges last input values from all ports.
 * @example
 * river = require("river-core");
 * merger = river.createMerger(["foo", "bar"]);
 * river.connect(merger.o.all, console.log);
 * merger.i.foo("a"); // logs: {foo: "a"}
 * merger.i.foo("b"); // logs: {foo: "b"}
 * merger.i.bar("c"); // logs: {foo: "b", bar: "c"}
 */
export type Merger<T> = Node<In<T>, Out<T>>;

/**
 * Creates a Merger node.
 * @param fields List of input fields.
 */
export function createMerger<T>(fields: Array<keyof T>): Merger<T> {
  return createNode<In<T>, Out<T>>(["all"], (outputs) => {
    const inputs = <DemuxerOutputs<T>>{};
    const i = <InPorts<In<T>>>{};
    for (const field of fields) {
      i[field] = (value, tag) => {
        inputs[field] = value;
        outputs.all(copy(inputs), tag);
      };
    }

    return i;
  });
}
