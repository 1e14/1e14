import {INode, TInPorts} from "../node";
import {createOutPorts, createOutputs} from "../utils";

export type TEqualityCallback<V> = (a: V, b: V, tag?: string) => boolean;

export interface IInputs<V> {
  /**
   * Input value pair.
   */
  d_vals: {
    a: V;
    b: V;
  };
}

export interface IOutputs<V> {
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
}

/**
 * Compares a pair of input values according to an optional equality callback.
 * Bounces input, and emits error on callback exception.
 * @example
 * mote = require("@kwaia/mote");
 * comparer = mote.createComparer();
 * mote.connect(comparer.o.d_eq, console.log);
 * comparer.i.d_vals({a: "foo", b: "foo"}); // logs: true
 * comparer.i.d_vals({a: "foo", b: "bar"}); // logs: false
 */
export type TComparer<V> = INode<IInputs<V>, IOutputs<V>>;

/**
 * Creates a Comparer node.
 * @param cb Equality callback.
 */
export function createComparer<V>(cb?: TEqualityCallback<V>): TComparer<V> {
  const o = createOutPorts(["b_d_vals", "d_eq", "ev_err"]);
  const outputs = createOutputs(o);

  const i: TInPorts<IInputs<V>> = cb ? {
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
