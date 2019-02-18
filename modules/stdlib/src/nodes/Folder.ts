import {
  createOutPorts,
  createOutputs,
  InPorts,
  Node,
  Tag
} from "river-core";
import {copy} from "../utils";

export type FolderCallback<I, O> = (
  curr: O,
  next: I,
  tag?: Tag) => O;

export type Inputs<I> = {
  /**
   * Value to be folded (aggregated).
   */
  d_val: I;

  /**
   * Reset signal.
   */
  ev_res: boolean;
};

export type Outputs<I, O> = {
  /**
   * Bounced input value.
   */
  b_d_val: I;

  /**
   * Folded (aggregated) value.
   */
  d_fold: O;

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
 * river = require("river-core");
 * folder = river.createFolder((curr, next) => curr + next);
 * river.connect(folder.o.d_fold, console.log);
 * folder.i.d_val(2);
 * folder.i.d_val(3);
 * folder.i.d_val(4);
 * folder.i.ev_res(true); // logs: 9
 */
export type Folder<I, O> = Node<Inputs<I> & { all: Inputs<I> }, Outputs<I, O>>;

/**
 * Creates a Folder node.
 * @param cb Aggregator (reduce) function.
 * @param initial Initial value for aggregation.
 */
export function createFolder<I, O>(
  cb: FolderCallback<I, O>,
  initial?: O
): Folder<I, O> {
  const o = createOutPorts(["b_d_val", "d_fold", "ev_err"]);
  const outputs = createOutputs(o);
  const initialized = arguments.length === 2;
  let folded: O;
  let first: boolean = true;

  const i: InPorts<Inputs<I> & { all: Inputs<I> }> = {
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
          outputs.d_fold(folded, tag);
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
        outputs.d_fold(folded, tag);
        first = true;
      }
    }
  };

  return {i, o};
}
