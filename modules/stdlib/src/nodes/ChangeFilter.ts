import {createNode, InPorts, Node} from "river-core";
import {EqualityCallback} from "./Comparer";

export type In<V> = {
  /**
   * Value to filter.
   */
  d_val: V;
};

export type Out<V> = {
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
};

/**
 * Filters input value for changes.
 * Forwards input value when different than the last one, according to
 * optional equality callback.
 * Bounces input, and emits error on callback exception.
 * @example
 * import {connect, createChangeFilter} from "river-stdlib";
 * const changeFilter = createChangeFilter();
 * connect(changeFilter.o.d_val, console.log);
 * changeFilter.i.d_val("a"); // logs: "a"
 * changeFilter.i.d_val("a");
 * changeFilter.i.d_val("b"); // logs: "b"
 */
export type ChangeFilter<V> = Node<In<V>, Out<V>>;

/**
 * Creates a ChangeFilter node.
 * @param cb Equality callback
 */
export function createChangeFilter<V>(cb?: EqualityCallback<V>): ChangeFilter<V> {
  return createNode<In<V>, Out<V>>
  (["b_d_val", "d_val", "ev_err"], (outputs) => {
    let last: V;

    return cb ? {
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
  });
}
