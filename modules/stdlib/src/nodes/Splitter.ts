import {createOutPorts, createOutputs, InPorts, Node} from "river-core";

export type Inputs<T> = {
  /**
   * Value to be split.
   */
  all: T;
};

export type Outputs<T> = T;

/**
 * Splits object input into its properties.
 * @example
 * river = require("river-core");
 * splitter = river.createSplitter(["foo", "bar"]);
 * river.connect(splitter.o.foo, console.log);
 * river.connect(splitter.o.bar, console.log);
 * splitter.i.all({foo: "a", bar: "b"}); // logs: "a", "b"
 */
export type Splitter<T> = Node<Inputs<T>, Outputs<T>>;

export function createSplitter<T>(fields: Array<keyof T>): Splitter<T> {
  const o = createOutPorts(fields);
  const outputs = createOutputs(o);

  const i: InPorts<Inputs<T>> = {
    all: (value, tag) => {
      for (const field of fields) {
        outputs[field](value[field], tag);
      }
    }
  };

  return {i, o};
}
