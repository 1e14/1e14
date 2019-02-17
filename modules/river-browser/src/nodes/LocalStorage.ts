import {createOutPorts, createOutputs, InPorts, Node} from "@protoboard/river";

export type Inputs = {
  clear: any;
  getItem: string;
  removeItem: string;
  setItem: [string, string];
};

export type Outputs = {
  getItem: string;
};

export type LocalStorage = Node<Inputs, Outputs>;

let instance: LocalStorage;

export function createLocalStorage(): LocalStorage {
  if (!instance) {
    const o = createOutPorts(["getItem"]);
    const outputs = createOutputs(o);

    const i: InPorts<Inputs> = {
      clear: () => {
        localStorage.clear();
      },

      getItem: (value, tag) => {
        outputs.getItem(localStorage.getItem(value), tag);
      },

      removeItem: (value) => {
        localStorage.removeItem(value);
      },

      setItem: ([key, value]) => {
        localStorage.setItem(key, value);
      }
    };

    instance = {i, o};
  }

  return instance;
}
