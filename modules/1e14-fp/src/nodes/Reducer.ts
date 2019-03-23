import {copy, createNode, Node} from "1e14";
import {ReducerCallback} from "../types";

export type In<I> = {
  /**
   * Value to be folded (aggregated).
   */
  d_val: I;

  /**
   * Reset signal.
   */
  ev_res: boolean;
};

export type Out<O> = {
  /**
   * Folded (aggregated) value.
   */
  d_val: O;
};

/**
 * Aggregates input values between reset signals, according to an aggregator
 * (reduce) callback.
 * Operates with either independent or joined inputs.
 * @link https://github.com/1e14/1e14/wiki/Reducer
 */
export type Reducer<I, O> = Node<In<I> & { all: In<I> }, Out<O>>;

/**
 * Creates a Reducer node.
 * @param cb Aggregator (reduce) function.
 * @param initial Initial value for aggregation.
 */
export function createReducer<I, O>(
  cb: ReducerCallback<I, O>,
  initial?: O
): Reducer<I, O> {
  return createNode<In<I> & { all: In<I> }, Out<O>>
  (["d_val"], (outputs) => {
    const o_d_val = outputs.d_val;
    const initialized = arguments.length === 2;
    let folded: O;
    let first: boolean = true;

    return {
      all: ({d_val, ev_res}, tag) => {
        if (first) {
          folded = initialized ?
            cb(copy(initial), d_val, tag) :
            <any>d_val;
          first = ev_res;
        } else {
          folded = cb(folded, d_val, tag);
        }
        if (ev_res) {
          o_d_val(folded, tag);
          first = true;
        }
      },

      d_val: (value, tag) => {
        if (first) {
          folded = initialized ?
            cb(copy(initial), value, tag) :
            <any>value;
          first = false;
        } else {
          folded = cb(folded, value, tag);
        }
      },

      ev_res: (value, tag) => {
        if (value) {
          o_d_val(folded, tag);
          first = true;
        }
      }
    };
  });
}
