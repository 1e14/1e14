import {createNode, InPorts, Node} from "river-core";
import {Muxed} from "../types";

export type In<T> = T;

export type Out<T> = {
  /**
   * Multiplexed input value.
   */
  d_mux: Muxed<T>;
};

/**
 * Multiplexes input value.
 * Forwards multiplexed input value to a single output port.
 * @example
 * import {connect, createMuxer} from "river-stdlib";
 * const muxer = createMuxer(["foo", "bar"]);
 * connect(muxer.o.d_mux, console.log);
 * muxer.i.foo("a"); // logs: {field: "foo", value: "a"}
 */
export type Muxer<T> = Node<In<T>, Out<T>>;

/**
 * Creates a Muxer node.
 * @param fields List of input fields.
 */
export function createMuxer<T>(fields: Array<keyof T>): Muxer<T> {
  return createNode<In<T>, Out<T>>(["d_mux"], (outputs) => {
    const i = <InPorts<In<T>>>{};
    for (const field of fields) {
      i[field] = (value, tag) => {
        outputs.d_mux({field, value}, tag);
      };
    }
    return i;
  });
}
