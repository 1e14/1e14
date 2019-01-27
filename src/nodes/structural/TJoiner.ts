import {INode, TInPorts, TTag} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";

export type TInputs<T> = T;

export interface IOutputs<T> {
  all: T;
}

export type TJoiner<T> = INode<TInputs<T>, IOutputs<T>>;

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
