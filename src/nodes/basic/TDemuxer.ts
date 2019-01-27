import {INode, TInPorts} from "../../node";
import {createOutPorts, createOutputs, IMuxed} from "../../utils";

export interface IInputs<T> {
  d_mux: IMuxed<T>;
}

export type TOutputs<T> = T;

export type TDemuxer<T> = INode<IInputs<T>, TOutputs<T>>;

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
