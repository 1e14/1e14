import {INode, TInPorts, TTag} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";

export type TMapperCallback<I, O> = (value: I, tag?: TTag) => O;

export interface IInputs<I> {
  /**
   * Value to be mapped.
   */
  d_val: I;
}

export interface IOutputs<I, O> {
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
}

/**
 * Maps input value according to mapper callback.
 * Bounces input, and emits error on callback exception.
 */
export type TMapper<I, O> = INode<IInputs<I>, IOutputs<I, O>>;

/**
 * Creates a Mapper node.
 * @param cb Mapper callback.
 */
export function createMapper<I, O>(cb: TMapperCallback<I, O>): TMapper<I, O> {
  const o = createOutPorts(["b_d_val", "d_val", "ev_err"]);
  const outputs = createOutputs(o);

  const i: TInPorts<IInputs<I>> = {
    d_val: (value, tag) => {
      try {
        outputs.d_val(cb(value, tag), tag);
      } catch (err) {
        outputs.b_d_val(value, tag);
        outputs.ev_err(String(err), tag);
      }
    }
  };

  return {i, o};
}
