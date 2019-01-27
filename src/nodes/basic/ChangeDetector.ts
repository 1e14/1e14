import {INode, TInPorts} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";
import {TEqualityCallback} from "./Comparer";

export interface IInputs<V> {
  d_val: V;
}

export interface IOutputs<V> {
  b_d_val: V;
  d_eq: boolean;
  ev_err: string;
}

export type TChangeDetector<V> = INode<IInputs<V>, IOutputs<V>>;

export function createChangeDetector<V>(
  cb?: TEqualityCallback<V>
): TChangeDetector<V> {
  const o = createOutPorts(["b_d_val", "d_eq", "ev_err"]);
  const outputs = createOutputs(o);

  let last: V;

  const i: TInPorts<IInputs<V>> = cb ? {
    d_val: (value, tag) => {
      try {
        outputs.d_eq(!cb(value, last), tag);
        last = value;
      } catch (err) {
        outputs.b_d_val(value, tag);
        outputs.ev_err(String(err), tag);
      }
    }
  } : {
    d_val: (value, tag) => {
      outputs.d_eq(value !== last, tag);
      last = value;
    }
  };

  return {i, o};
}
