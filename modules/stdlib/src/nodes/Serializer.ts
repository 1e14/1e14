import {
  createOutPorts,
  createOutputs,
  InPorts,
  Node,
  Tag
} from "river-core";

export type Inputs<V> = {
  /**
   * Values to serialize.
   */
  d_val: V;

  /**
   * Reference input.
   */
  r_tag: any;
};

export type Outputs<V> = {
  /**
   * Forwarded value.
   */
  d_val: V;
};

/**
 * Forwards input values in an order matching the reference input.
 * @example
 * river = require("river-core");
 * serializer = river.createSerializer();
 * river.connect(serializer.o.d_val, console.log);
 * serializer.i.d_val("a", 2);
 * serializer.i.r_tag(null, 1);
 * serializer.i.r_tag(null, 2);
 * serializer.i.d_val("b", 1); // logs: "b" 1, "a" 2
 */
export type Serializer<V> = Node<Inputs<V>, Outputs<V>>;

/**
 * Creates a Serializer node.
 */
export function createSerializer<V>(): Serializer<V> {
  const o = createOutPorts(["d_val"]);
  const outputs = createOutputs(o);

  const values: Map<Tag, V> = new Map();
  const order: Array<Tag> = [];

  const i: InPorts<Inputs<V>> = {
    d_val: (value, tag) => {
      values.set(tag, value);
      flush();
    },

    r_tag: (value, tag) => {
      order.push(tag);
      flush();
    }
  };

  function flush() {
    while (values.has(order[0])) {
      const tag = order.shift();
      const value = values.get(tag);
      values.delete(tag);
      outputs.d_val(value, tag);
    }
  }

  return {i, o};
}
