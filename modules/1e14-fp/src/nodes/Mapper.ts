import {createNode, Node} from "1e14";
import {MapperCallback} from "../types";

export type In<I> = {
  /**
   * Value to be mapped.
   */
  d_val: I;
};

export type Out<O> = {
  /**
   * Mapped value.
   */
  d_val: O;
};

/**
 * Maps input value according to mapper callback.
 * Bounces input, and emits error on callback exception.
 * @example
 * import {connect} from "1e14";
 * import {createMapper} from "1e14-fp";
 * const mapper = createMapper(next => 2 * next);
 * connect(mapper.o.d_val, console.log);
 * mapper.i.d_val(5); // logs: 10
 */
export type Mapper<I, O> = Node<In<I>, Out<O>>;

/**
 * Creates a Mapper node.
 * @param cb Mapper callback.
 */
export function createMapper<I, O>(cb: MapperCallback<I, O>): Mapper<I, O> {
  return createNode<In<I>, Out<O>>
  (["d_val"], (outputs) => {
    const o_d_val = outputs.d_val;
    return {
      d_val: (value, tag) => {
        o_d_val(cb(value, tag), tag);
      }
    };
  });
}
