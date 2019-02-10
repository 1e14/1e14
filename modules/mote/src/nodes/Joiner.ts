import {INode, TInPorts, TTag} from "../node";
import {createOutPorts, createOutputs} from "../utils";

export type TInputs<T> = T;

export interface IOutputs<T> {
  /**
   * Joined inputs.
   */
  all: T;
}

/**
 * Joins input values from all ports having the same tag.
 * @example
 * mote = require("@kwaia/mote");
 * joiner = mote.createJoiner(["foo", "bar"]);
 * mote.connect(joiner.o.all, console.log);
 * joiner.i.foo("a", 2);
 * joiner.i.foo("b", 1);
 * joiner.i.bar("c", 2); // logs: {foo: "a", bar: "c"} 2
 */
export type TJoiner<T> = INode<TInputs<T>, IOutputs<T>>;

/**
 * Creates a Joiner node.
 * @param fields List of input fields.
 */
export function createJoiner<T>(fields: Array<keyof T>): TJoiner<T> {
  const o = createOutPorts(["all"]);
  const outputs = createOutputs(o);

  const inputSets: Map<TTag, T> = new Map();
  const portSets: Map<TTag, Set<keyof T>> = new Map();

  const i = <TInPorts<TInputs<T>>>{};
  for (const field of fields) {
    i[field] = (value, tag) => {
      let inputs = inputSets.get(tag);
      if (!inputs) {
        inputs = <T>{};
        inputSets.set(tag, inputs);
      }

      let ports = portSets.get(tag);
      if (!ports) {
        ports = new Set(fields);
        portSets.set(tag, ports);
      }

      inputs[field] = value;
      ports.delete(field);

      if (ports.size === 0) {
        inputSets.delete(tag);
        portSets.delete(tag);
        outputs.all(inputs, tag);
      }
    };
  }

  return {i, o};
}
