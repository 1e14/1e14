import {INode, TInPorts} from "../../node";
import {copy, createOutPorts, createOutputs} from "../../utils";
import {TOutputs} from "../basic/TDemuxer";

export type TInputs<T> = T;

export interface IOutputs<T> {
  all: T;
}

export type TMerger<T> = INode<TInputs<T>, IOutputs<T>>;

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
