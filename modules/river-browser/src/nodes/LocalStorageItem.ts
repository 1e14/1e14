import {createOutPorts, createOutputs, InPorts, Node} from "@protoboard/river";

export type Inputs = {
  d_val: string;
  ev_rem: any;
  ev_smp: any;
};

export type Outputs = {
  d_val: string;
};

export type LocalStorageItem = Node<Inputs, Outputs>;

export function createLocalStorageItem(key: string): LocalStorageItem {
  const o = createOutPorts(["d_val"]);
  const outputs = createOutputs(o);

  const i: InPorts<Inputs> = {
    d_val: (value, tag) => {
      localStorage.setItem(key, value);
      outputs.d_val(value, tag);
    },

    ev_rem: (value, tag) => {
      localStorage.removeItem(key);
      outputs.d_val(undefined, tag);
    },

    ev_smp: (value, tag) => {
      outputs.d_val(localStorage.getItem(key), tag);
    }
  };

  return {i, o};
}
