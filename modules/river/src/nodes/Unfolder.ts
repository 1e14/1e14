import {INode, TInPorts, TTag} from "../node";
import {createOutPorts, createOutputs} from "../utils";

export type TUnfolderCallback<I, O> = (value: I, tag?: TTag) => IterableIterator<O>;

export interface IInputs<I> {
  /**
   * Value to unfold.
   */
  d_fold: I;
}

export interface IOutputs<I, O> {
  /**
   * Bounced input value.
   */
  b_d_fold: I;

  /**
   * Unfolded value.
   */
  d_val: O;

  /**
   * Error message.
   */
  ev_err: string;
}

/**
 * Opposite of Folder.
 * Emits multiple outputs for a single input, according to an unfolder
 * (generator) callback.
 * Bounces input, and emits error on callback exception.
 * @example
 * river = require("@protoboard/river");
 * unfolder = river.createUnfolder(function *(value) {while (value > 0) yield value--});
 * river.connect(unfolder.o.d_val, console.log);
 * unfolder.i.d_fold(5); // logs: 5, 4, 3, 2, 1
 */
export type TUnfolder<I, O> = INode<IInputs<I>, IOutputs<I, O>>;

/**
 * Creates an Unfolder node.
 * @param cb Unfolder callback (generator).
 */
export function createUnfolder<I, O>(cb: TUnfolderCallback<I, O>): TUnfolder<I, O> {
  const o = createOutPorts(["b_d_fold", "d_val", "ev_err"]);
  const outputs = createOutputs(o);

  const i: TInPorts<IInputs<I>> = {
    d_fold: (value, tag) => {
      try {
        const iterable = cb(value, tag);
        const d_val = outputs.d_val;
        for (const next of iterable) {
          d_val(next, tag);
        }
      } catch (err) {
        outputs.b_d_fold(value, tag);
        outputs.ev_err(String(err), tag);
      }
    }
  };

  return {i, o};
}
