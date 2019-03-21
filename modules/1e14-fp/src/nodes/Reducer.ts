import {createNode, Node} from "1e14";
import {ReducerCallback} from "../types";
import {copy} from "../utils";

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

export type Out<I, O> = {
  /**
   * Bounced input value.
   */
  b_d_val: I;

  /**
   * Folded (aggregated) value.
   */
  d_val: O;

  /**
   * Error message.
   */
  ev_err: string;
};

/**
 * Aggregates input values between reset signals, according to an aggregator
 * (reduce) callback.
 * Bounces input, and emits error on callback exception.
 * Operates with either independent or joined inputs.
 * @example
 * import {connect, createReducer} from "1e14";
 * const reducer = createReducer((curr, next) => curr + next);
 * connect(reducer.o.d_val, console.log);
 * reducer.i.d_val(2);
 * reducer.i.d_val(3);
 * reducer.i.d_val(4);
 * reducer.i.ev_res(true); // logs: 9
 */
export type Reducer<I, O> = Node<In<I> & { all: In<I> }, Out<I, O>>;

/**
 * Creates a Reducer node.
 * @param cb Aggregator (reduce) function.
 * @param initial Initial value for aggregation.
 */
export function createReducer<I, O>(
  cb: ReducerCallback<I, O>,
  initial?: O
): Reducer<I, O> {
  return createNode<In<I> & { all: In<I> }, Out<I, O>>
  (["b_d_val", "d_val", "ev_err"], (outputs) => {
    const initialized = arguments.length === 2;
    let folded: O;
    let first: boolean = true;

    return {
      all: ({d_val, ev_res}, tag) => {
        try {
          if (first) {
            folded = initialized ?
              cb(copy(initial), d_val, tag) :
              <any>d_val;
            first = ev_res;
          } else {
            folded = cb(folded, d_val, tag);
          }
          if (ev_res) {
            outputs.d_val(folded, tag);
            first = true;
          }
        } catch (err) {
          outputs.b_d_val(d_val, tag);
          outputs.ev_err(String(err), tag);
        }
      },

      d_val: (value, tag) => {
        try {
          if (first) {
            folded = initialized ?
              cb(copy(initial), value, tag) :
              <any>value;
            first = false;
          } else {
            folded = cb(folded, value, tag);
          }
        } catch (err) {
          outputs.b_d_val(value, tag);
          outputs.ev_err(String(err), tag);
        }
      },

      ev_res: (value, tag) => {
        if (value) {
          outputs.d_val(folded, tag);
          first = true;
        }
      }
    };
  });
}
