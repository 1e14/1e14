import {TOutPorts, TTag} from "../node";

/**
 * Creates output ports for the specified fields.
 * @param fields List of fields.
 */
export function createOutPorts<O>(fields: Array<keyof O>): TOutPorts<O> {
  const outPorts = <TOutPorts<O>>{};
  for (const field of fields) {
    outPorts[field] = new Set();
  }
  return outPorts;
}

export type TOutput<V> = (value: V, tag?: TTag) => void;
export type TOutputs<O> = {
  [K in keyof O]: TOutput<O[K]>
};

/**
 * Creates output callbacks for the specified output ports.
 * The result is used in implementing atomic nodes.
 * @param outPorts List of output callbacks.
 */
export function createOutputs<O>(outPorts: TOutPorts<O>): TOutputs<O> {
  const outputs = <TOutputs<O>>{};
  for (const field in outPorts) {
    const inPorts = outPorts[field];
    outputs[field] = (value, tag) => {
      for (const inPort of inPorts) {
        inPort(value, tag);
      }
    };
  }
  return outputs;
}

export const noop = () => null;
