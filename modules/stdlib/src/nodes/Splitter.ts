import {createNode, Node} from "river-core";

export type In<T> = {
  /**
   * Value to be split.
   */
  all: T;
};

export type Out<T> = T;

/**
 * Splits object input into its properties.
 * @example
 * river = require("river-core");
 * splitter = river.createSplitter(["foo", "bar"]);
 * river.connect(splitter.o.foo, console.log);
 * river.connect(splitter.o.bar, console.log);
 * splitter.i.all({foo: "a", bar: "b"}); // logs: "a", "b"
 */
export type Splitter<T> = Node<In<T>, Out<T>>;

export function createSplitter<T>(fields: Array<keyof T>): Splitter<T> {
  return createNode<In<T>, Out<T>>(fields, (outputs) => {
    return {
      all: (value, tag) => {
        for (const field of fields) {
          outputs[field](value[field], tag);
        }
      }
    };
  });
}
