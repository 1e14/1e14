import {INode, TInPorts} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";

export interface IInputs<T> {
  /**
   * Value to be split.
   */
  all: T;
}

export type TOutputs<T> = T;

/**
 * Splits object input into its properties.
 * @example
 * splitter = createSplitter(["foo", "bar"]);
 * mote.connect(splitter.o.foo, console.log);
 * mote.connect(splitter.o.bar, console.log);
 * splitter.i.all({foo: "a", bar: "b"}); // logs: "a", "b"
 */
export type TSplitter<T> = INode<IInputs<T>, TOutputs<T>>;

export function createSplitter<T>(fields: Array<keyof T>): TSplitter<T> {
  const o = createOutPorts(fields);
  const outputs = createOutputs(o);

  const i: TInPorts<IInputs<T>> = {
    all: (value, tag) => {
      for (const field of fields) {
        outputs[field](value[field], tag);
      }
    }
  };

  return {i, o};
}
