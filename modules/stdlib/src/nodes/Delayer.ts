import {createNode, Node} from "river-core";

export type In<V> = {
  /**
   * Value to be delayed.
   */
  d_val: V;
};

export type Out<V> = {
  /**
   * Delayed value.
   */
  d_val: V;
};

/**
 * Forwards input value with the specified delay.
 * @example
 * import {connect, createDelayer} from "river-stdlib";
 * const delayer = createDelayer(1000);
 * connect(delayer.o.d_val, console.log);
 * delayer.i.d_val("a"); // logs after 1 second: "a"
 */
export type Delayer<V> = Node<In<V>, Out<V>>;

/**
 * Creates a Delayer node.
 * @param ms Number of milliseconds between receiving and forwarding input.
 */
export function createDelayer<V>(ms: number): Delayer<V> {
  return createNode<In<V>, Out<V>>(["d_val"], (outputs) => {
    return {
      d_val: (value, tag) => {
        setTimeout(() => {
          outputs.d_val(value, tag);
        }, ms);
      }
    };
  });
}
