import {
  createOutPorts,
  createOutputs,
  InPorts,
  Node,
  Tag
} from "@protoboard/river";

export type UnfolderCallback<I, O> = (value: I, tag?: Tag) => IterableIterator<O>;

export type Inputs<I> = {
  /**
   * Value to unfold.
   */
  d_fold: I;
};

export type Outputs<I, O> = {
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
};

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
export type Unfolder<I, O> = Node<Inputs<I>, Outputs<I, O>>;

/**
 * Creates an Unfolder node.
 * @param cb Unfolder callback (generator).
 */
export function createUnfolder<I, O>(cb: UnfolderCallback<I, O>): Unfolder<I, O> {
  const o = createOutPorts(["b_d_fold", "d_val", "ev_err"]);
  const outputs = createOutputs(o);

  const i: InPorts<Inputs<I>> = {
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
