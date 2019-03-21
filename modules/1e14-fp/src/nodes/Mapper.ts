import {createNode, Node} from "1e14";
import {MapperCallback} from "../types";

export type In<I> = {
  /**
   * Value to be mapped.
   */
  d_val: I;
};

export type Out<I, O> = {
  /**
   * Bounced input value.
   */
  b_d_val: I;

  /**
   * Mapped value.
   */
  d_val: O;

  /**
   * Error message.
   */
  ev_err: string;
};

/**
 * Maps input value according to mapper callback.
 * Bounces input, and emits error on callback exception.
 * @example
 * import {connect, createMapper} from "river-stdlib";
 * const mapper = createMapper(next => 2 * next);
 * connect(mapper.o.d_val, console.log);
 * mapper.i.d_val(5); // logs: 10
 */
export type Mapper<I, O> = Node<In<I>, Out<I, O>>;

/**
 * Creates a Mapper node.
 * @param cb Mapper callback.
 */
export function createMapper<I, O>(cb: MapperCallback<I, O>): Mapper<I, O> {
  return createNode<In<I>, Out<I, O>>
  (["b_d_val", "d_val", "ev_err"], (outputs) => {
    return {
      d_val: (value, tag) => {
        try {
          outputs.d_val(cb(value, tag), tag);
        } catch (err) {
          outputs.b_d_val(value, tag);
          outputs.ev_err(String(err), tag);
        }
      }
    };
  });
}
