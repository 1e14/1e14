import {createOutPorts, createOutputs, InPorts, Node} from "river-core";
import {EqualityCallback} from "./Comparer";

export type Inputs<V> = {
  /**
   * Value to detect changes in.
   */
  d_val: V;
};

export type Outputs<V> = {
  /**
   * Bounced input value.
   */
  b_d_val: V;

  /**
   * Whether current value is different to previous.
   */
  d_chg: boolean;

  /**
   * Error message.
   */
  ev_err: string;
};

/**
 * Detects changes in input value in impulse domain.
 * Emits `true` or `false` depending on whether input value is different than
 * last one, according to optional equality callback.
 * Bounces input, and emits error on callback exception.
 * @example
 * river = require("river-core");
 * changeDetector = river.createChangeDetector();
 * river.connect(changeDetector.o.d_chg, console.log);
 * changeDetector.i.d_val("a"); // logs: true
 * changeDetector.i.d_val("b"); // logs: true
 * changeDetector.i.d_val("b"); // logs: false
 */
export type ChangeDetector<V> = Node<Inputs<V>, Outputs<V>>;

/**
 * Creates a ChangeDetector node.
 * @param cb Equality callback.
 */
export function createChangeDetector<V>(
  cb?: EqualityCallback<V>
): ChangeDetector<V> {
  const o = createOutPorts(["b_d_val", "d_chg", "ev_err"]);
  const outputs = createOutputs(o);

  let last: V;

  const i: InPorts<Inputs<V>> = cb ? {
    d_val: (value, tag) => {
      try {
        outputs.d_chg(!cb(value, last), tag);
        last = value;
      } catch (err) {
        outputs.b_d_val(value, tag);
        outputs.ev_err(String(err), tag);
      }
    }
  } : {
    d_val: (value, tag) => {
      outputs.d_chg(value !== last, tag);
      last = value;
    }
  };

  return {i, o};
}
