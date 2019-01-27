import {INode, TInPorts, TTag} from "../../node";
import {copy, createOutPorts, createOutputs} from "../../utils";

export type TFolderCallback<I, O> = (
  curr: O,
  next: I,
  tag?: TTag) => O;

export interface IInputs<I> {
  d_val: I;
  ev_res: boolean;
}

export interface IOutputs<I, O> {
  b_d_val: I;
  d_fold: O;
  ev_err: string;
}

export type TFolder<I, O> = INode<IInputs<I> & { all: IInputs<I> }, IOutputs<I, O>>;

export function createFolder<I, O>(
  cb: TFolderCallback<I, O>,
  initial?: O
): TFolder<I, O> {
  const o = createOutPorts(["b_d_val", "d_fold", "ev_err"]);
  const outputs = createOutputs(o);

  let folded = copy(initial);

  const i: TInPorts<IInputs<I> & { all: IInputs<I> }> = {
    all: ({d_val, ev_res}, tag) => {
      try {
        folded = cb(folded, d_val, tag);
        if (ev_res) {
          outputs.d_fold(folded, tag);
          folded = copy(initial);
        }
      } catch (err) {
        outputs.b_d_val(d_val, tag);
        outputs.ev_err(String(err), tag);
      }
    },

    d_val: (value, tag) => {
      try {
        folded = cb(folded, value, tag);
      } catch (err) {
        outputs.b_d_val(value, tag);
        outputs.ev_err(String(err), tag);
      }
    },

    ev_res: (value, tag) => {
      if (value) {
        outputs.d_fold(folded, tag);
        folded = copy(initial);
      }
    }
  };

  return {i, o};
}
