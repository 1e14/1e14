import {createOutPorts, createOutputs, InPorts, Node} from "river-core";

export type Inputs<V> = {
  /**
   * Value to be forwarded.
   */
  d_val: V;
};

export type Outputs<V> = {
  /**
   * Forwarded input value.
   */
  d_val: V;
};

/**
 * Forwards input value unconditionally.
 * @example
 * river = require("river-core");
 * noop = river.createNoop();
 * river.connect(noop.o.d_val, console.log);
 * noop.i.d_val(5); // logs: 5
 */
export type Noop<V> = Node<Inputs<V>, Outputs<V>>;

/**
 * Creates a Noop node.
 */
export function createNoop<V>(): Noop<V> {
  const o = createOutPorts(["d_val"]);
  const outputs = createOutputs(o);

  const i: InPorts<Inputs<V>> = {
    d_val: (value, tag) => {
      outputs.d_val(value, tag);
    }
  };

  return {i, o};
}
