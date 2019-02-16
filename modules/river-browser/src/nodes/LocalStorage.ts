import {
  createOutPorts,
  createOutputs,
  INode,
  TInPorts
} from "@protoboard/river";

export interface IInputs {
  clear: any;
  getItem: string;
  removeItem: string;
  setItem: [string, string];
}

export interface IOutputs {
  getItem: string;
}

export type TLocalStorage = INode<IInputs, IOutputs>;

let instance: TLocalStorage;

export function createLocalStorage(): TLocalStorage {
  if (!instance) {
    const o = createOutPorts(["getItem"]);
    const outputs = createOutputs(o);

    const i: TInPorts<IInputs> = {
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
