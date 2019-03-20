import {createNode, Node, Tag} from "../../../1e14";

export type In<V> = {
  /**
   * Values to serialize.
   */
  d_val: V;

  /**
   * Reference input.
   */
  r_tag: any;
};

export type Out<V> = {
  /**
   * Forwarded value.
   */
  d_val: V;
};

/**
 * Forwards input values in an order matching the reference input.
 * @example
 * import {connect, createSerializer} from "river-stdlib";
 * const serializer = createSerializer();
 * connect(serializer.o.d_val, console.log);
 * serializer.i.d_val("a", 2);
 * serializer.i.r_tag(null, 1);
 * serializer.i.r_tag(null, 2);
 * serializer.i.d_val("b", 1); // logs: "b" 1, "a" 2
 */
export type Serializer<V> = Node<In<V>, Out<V>>;

/**
 * Creates a Serializer node.
 */
export function createSerializer<V>(): Serializer<V> {
  return createNode<In<V>, Out<V>>(["d_val"], (outputs) => {
    const values: Map<Tag, V> = new Map();
    const order: Array<Tag> = [];

    function flush() {
      while (values.has(order[0])) {
        const tag = order.shift();
        const value = values.get(tag);
        values.delete(tag);
        outputs.d_val(value, tag);
      }
    }

    return {
      d_val: (value, tag) => {
        values.set(tag, value);
        flush();
      },

      r_tag: (value, tag) => {
        order.push(tag);
        flush();
      }
    };
  });
}
