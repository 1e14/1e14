import {createNode, Node} from "1e14";
import {EqualityCallback} from "./Comparer";

export type In<V> = {
  /**
   * Value to detect changes in.
   */
  d_val: V;
};

export type Out<V> = {
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
 * import {connect, createBuffer} from "river-stdlib";
 * const changeDetector = createChangeDetector();
 * connect(changeDetector.o.d_chg, console.log);
 * changeDetector.i.d_val("a"); // logs: true
 * changeDetector.i.d_val("b"); // logs: true
 * changeDetector.i.d_val("b"); // logs: false
 */
export type ChangeDetector<V> = Node<In<V>, Out<V>>;

/**
 * Creates a ChangeDetector node.
 * @param cb Equality callback.
 */
export function createChangeDetector<V>(
  cb?: EqualityCallback<V>
): ChangeDetector<V> {
  return createNode<In<V>, Out<V>>
  (["b_d_val", "d_chg", "ev_err"], (outputs) => {
    let last: V;

    return cb ? {
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
  });
}
