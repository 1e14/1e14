import {INode, TInPorts} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";

export type TEqualityCallback<V> = (a: V, b: V, tag?: string) => boolean;

export interface IInputs<V> {
  d_vals: {
    a: V;
    b: V;
  };
}

export interface IOutputs<V> {
  b_d_vals: V;
  d_eq: boolean;
  ev_err: string;
}

export type TComparer<V> = INode<IInputs<V>, IOutputs<V>>;

export function createComparer<V>(cb?: TEqualityCallback<V>): TComparer<V> {
  const o = createOutPorts(["b_d_vals", "d_eq", "ev_err"]);
  const outputs = createOutputs(o);

  const i: TInPorts<IInputs<V>> = cb ? {
    d_vals: (value, tag) => {
      try {
        outputs.d_eq(cb(value.a, value.b, tag), tag);
      } catch (err) {
        outputs.b_d_vals(value, tag);
        outputs.ev_err(String(err), tag);
      }
    }
  } : {
    d_vals: (value, tag) => {
      outputs.d_eq(value.a === value.b, tag);
    }
  };

  return {i, o};
}
