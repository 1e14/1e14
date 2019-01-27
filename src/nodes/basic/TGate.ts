import {INode, TInPorts} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";

export interface IInputs<V> {
  d_val: V;
  st_open: boolean;
}

export interface IOutputs<V> {
  d_val: V;
}

export type TGate<V> = INode<IInputs<V> & { all: IInputs<V> }, IOutputs<V>>;

export function createGate<V>(open?: boolean): TGate<V> {
  const o = createOutPorts(["d_val"]);
  const outputs = createOutputs(o);

  const i: TInPorts<IInputs<V> & { all: IInputs<V> }> = {
    all: ({d_val, st_open}, tag) => {
      if (st_open) {
        outputs.d_val(d_val, tag);
      }
    },

    d_val: (value, tag) => {
      if (open) {
        outputs.d_val(value, tag);
      }
    },

    st_open: (value) => {
      open = value;
    }
  };

  return {i, o};
}
