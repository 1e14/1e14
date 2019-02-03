import {INode, TInPorts} from "../../node";
import {copy, createOutPorts, createOutputs} from "../../utils";
import {TOutputs} from "../basic/Demuxer";

export type TInputs<T> = T;

export interface IOutputs<T> {
  /**
   * Merged inputs.
   */
  all: T;
}

/**
 * Merges last input values from all ports.
 * @example
 * mote = require("@kwaia/mote");
 * merger = mote.createMerger(["foo", "bar"]);
 * mote.connect(merger.o.all, console.log);
 * merger.i.foo("a"); // logs: {foo: "a"}
 * merger.i.foo("b"); // logs: {foo: "b"}
 * merger.i.bar("c"); // logs: {foo: "b", bar: "c"}
 */
export type TMerger<T> = INode<TInputs<T>, IOutputs<T>>;

/**
 * Creates a Merger node.
 * @param fields List of input fields.
 */
export function createMerger<T>(fields: Array<keyof T>): TMerger<T> {
  const o = createOutPorts(["all"]);
  const outputs = createOutputs(o);

  const inputs = <TOutputs<T>>{};

  const i = <TInPorts<TInputs<T>>>{};
  for (const field of fields) {
    i[field] = (value, tag) => {
      inputs[field] = value;
      outputs.all(copy(inputs), tag);
    };
  }

  return {i, o};
}
