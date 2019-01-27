import {TOutPorts, TTag} from "../node";

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

export function copy(a: any): any {
  if (a instanceof Array) {
    return a.slice();
  } else if (a instanceof Object) {
    const result = {};
    // tslint:disable:forin
    for (const key in a) {
      result[key] = a[key];
    }
    // tslint:enable:forin
    return result;
  } else {
    return a;
  }
}
