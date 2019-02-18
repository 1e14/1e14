import {createOutPorts, createOutputs, InPorts, Node} from "river-core";

export type EqualityCallback<V> = (a: V, b: V, tag?: string) => boolean;

export type Inputs<V> = {
  /**
   * Input value pair.
   */
  d_vals: {
    a: V;
    b: V;
  };
};

export type Outputs<V> = {
  /**
   * Bounced input value pair.
   */
  b_d_vals: V;

  /**
   * Whether input values are equal.
   */
  d_eq: boolean;

  /**
   * Error message.
   */
  ev_err: string;
};

/**
 * Compares a pair of input values according to an optional equality callback.
 * Bounces input, and emits error on callback exception.
 * @example
 * river = require("river-core");
 * comparer = river.createComparer();
 * river.connect(comparer.o.d_eq, console.log);
 * comparer.i.d_vals({a: "foo", b: "foo"}); // logs: true
 * comparer.i.d_vals({a: "foo", b: "bar"}); // logs: false
 */
export type Comparer<V> = Node<Inputs<V>, Outputs<V>>;

/**
 * Creates a Comparer node.
 * @param cb Equality callback.
 */
export function createComparer<V>(cb?: EqualityCallback<V>): Comparer<V> {
  const o = createOutPorts(["b_d_vals", "d_eq", "ev_err"]);
  const outputs = createOutputs(o);

  const i: InPorts<Inputs<V>> = cb ? {
    d_vals: (value, tag) => {
      try {
        outputs.d_eq(cb(value.a, value.b, tag), tag);
      } catch (err) {
        outputs.b_d_vals(value, tag);
        outputs.ev_err(String(err), tag);
      }
    }
  } : {
    d_vals: (value, tag) => {
      outputs.d_eq(value.a === value.b, tag);
    }
  };

  return {i, o};
}
