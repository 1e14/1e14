import {createNode, InPorts, Node, Tag} from "../../../1e14";

export type In<T> = T;

export type Out<T> = {
  /**
   * Joined inputs.
   */
  all: T;
};

/**
 * Joins input values from all ports having the same tag.
 * @example
 * import {connect, createJoiner} from "river-stdlib";
 * const joiner = createJoiner(["foo", "bar"]);
 * connect(joiner.o.all, console.log);
 * joiner.i.foo("a", 2);
 * joiner.i.foo("b", 1);
 * joiner.i.bar("c", 2); // logs: {foo: "a", bar: "c"} 2
 */
export type Joiner<T> = Node<In<T>, Out<T>>;

/**
 * Creates a Joiner node.
 * @param fields List of input fields.
 */
export function createJoiner<T>(fields: Array<keyof T>): Joiner<T> {
  return createNode<In<T>, Out<T>>(["all"], (outputs) => {
    const inputSets: Map<Tag, T> = new Map();
    const portSets: Map<Tag, Set<keyof T>> = new Map();

    const i = <InPorts<In<T>>>{};
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

    return i;
  });
}
