import {INode, TInPorts, TTag} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";

export interface IInputs<V> {
  d_val: V;
  st_open: boolean;
}

export interface IOutputs<V> {
  d_val: V;
  st_size: number;
}

export type TBuffer<V> = INode<IInputs<V> & { all: IInputs<V> }, IOutputs<V>>;

export function createBuffer<V>(open?: boolean): TBuffer<V> {
  const o = createOutPorts(["d_val", "st_size"]);
  const outputs = createOutputs(o);

  const buffer: Array<{ value: V, tag: TTag }> = [];

  const i: TInPorts<IInputs<V> & { all: IInputs<V> }> = {
    all: ({d_val, st_open}, tag) => {
      if (st_open && !open) {
        flush();
      }
      open = st_open;
      if (open) {
        outputs.d_val(d_val, tag);
      } else {
        buffer.push({value: d_val, tag});
      }
      outputs.st_size(buffer.length, tag);
    },

    d_val: (value, tag) => {
      if (open) {
        outputs.d_val(value, tag);
      } else {
        buffer.push({value, tag});
      }
      outputs.st_size(buffer.length, tag);
    },

    st_open: (value, tag) => {
      if (value && !open) {
        flush();
      }
      open = value;
      outputs.st_size(buffer.length, tag);
    }
  };

  function flush() {
    const d_val = outputs.d_val;
    while (buffer.length) {
      const next = buffer.shift();
      d_val(next.value, next.tag);
    }
  }

  return {i, o};
}
