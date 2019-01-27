import {INode, TInPorts} from "../../node";
import {createOutPorts, createOutputs, IMuxed} from "../../utils";

export type TInputs<T> = T;

export interface IOutputs<T> {
  d_mux: IMuxed<T>;
}

export type TMuxer<T> = INode<TInputs<T>, IOutputs<T>>;

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
