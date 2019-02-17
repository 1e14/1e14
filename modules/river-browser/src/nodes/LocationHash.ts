import {createOutPorts, createOutputs, InPorts, Node} from "@protoboard/river";

export type Inputs = {
  d_val: string;
  ev_smp: any;
};

export type Outputs = {
  d_val: string;
};

export type LocationHash = Node<Inputs, Outputs>;

let instance: LocationHash;
let counter: number = 0;

export function createLocationHash(): LocationHash {
  if (!instance) {
    const o = createOutPorts(["d_val"]);
    const outputs = createOutputs(o);

    const i: InPorts<Inputs> = {
      d_val: (value, tag) => {
        location.hash = value;
      },

      ev_smp: (value, tag) => {
        outputs.d_val(location.hash, tag);
      }
    };

    document.addEventListener("DOMContentLoaded", () => {
      outputs.d_val(location.hash, `LocationHash-${counter++}`);
    });

    document.addEventListener("hashchange", () => {
      outputs.d_val(location.hash, `LocationHash-${counter++}`);
    });

    instance = {i, o};
  }

  return instance;
}
