import {createNode, Node} from "../../../1e14";

export type EqualityCallback<V> = (a: V, b: V, tag?: string) => boolean;

export type In<V> = {
  /**
   * Input value pair.
   */
  d_vals: {
    a: V;
    b: V;
  };
};

export type Out<V> = {
  /**
   * Bounced input value pair.
   */
  b_d_vals: {
    a: V;
    b: V;
  };

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
 * import {connect, createComparer} from "river-stdlib";
 * const comparer = createComparer();
 * connect(comparer.o.d_eq, console.log);
 * comparer.i.d_vals({a: "foo", b: "foo"}); // logs: true
 * comparer.i.d_vals({a: "foo", b: "bar"}); // logs: false
 */
export type Comparer<V> = Node<In<V>, Out<V>>;

/**
 * Creates a Comparer node.
 * @param cb Equality callback.
 */
export function createComparer<V>(cb?: EqualityCallback<V>): Comparer<V> {
  return createNode<In<V>, Out<V>>
  (["b_d_vals", "d_eq", "ev_err"], (outputs) => {
    return cb ? {
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
  });
}
