import {createNode, Node} from "1e14";

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
 * import {connect} from "1e14";
 * import {createSplitter} from "1e14-flow";
 * const splitter = createSplitter(["foo", "bar"]);
 * connect(splitter.o.foo, console.log);
 * connect(splitter.o.bar, console.log);
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
