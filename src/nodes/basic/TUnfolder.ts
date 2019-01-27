import {INode, TInPorts, TTag} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";

export type TUnfolderCallback<I, O> = (value: I, tag?: TTag) => IterableIterator<O>;

export interface IInputs<I> {
  d_fold: I;
}

export interface IOutputs<I, O> {
  b_d_fold: I;
  d_val: O;
  ev_err: string;
}

export type TUnfolder<I, O> = INode<IInputs<I>, IOutputs<I, O>>;

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
