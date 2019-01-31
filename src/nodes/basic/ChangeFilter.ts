import {INode, TInPorts} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";
import {TEqualityCallback} from "./Comparer";

export interface IInputs<V> {
  /**
   * Value to filter.
   */
  d_val: V;
}

export interface IOutputs<V> {
  /**
   * Bounced input value.
   */
  b_d_val: V;

  /**
   * Forwarded value.
   */
  d_val: V;

  /**
   * Error message.
   */
  ev_err: string;
}

/**
 * Filters input value for changes.
 * Forwards input value when different than the last one, according to
 * optional equality callback.
 * Bounces input, and emits error on callback exception.
 */
export type TChangeFilter<V> = INode<IInputs<V>, IOutputs<V>>;

/**
 * Creates a ChangeFilter node.
 * @param cb Equality callback
 */
export function createChangeFilter<V>(cb?: TEqualityCallback<V>): TChangeFilter<V> {
  const o = createOutPorts(["b_d_val", "d_val", "ev_err"]);
  const outputs = createOutputs(o);

  let last: V;

  const i: TInPorts<IInputs<V>> = cb ? {
    d_val: (value, tag) => {
      try {
        if (!cb(value, last)) {
          outputs.d_val(value, tag);
        }
      } catch (err) {
        outputs.b_d_val(value, tag);
        outputs.ev_err(String(err), tag);
      }
      last = value;
    }
  } : {
    d_val: (value, tag) => {
      if (value !== last) {
        outputs.d_val(value, tag);
      }
      last = value;
    }
  };

  return {i, o};
}
