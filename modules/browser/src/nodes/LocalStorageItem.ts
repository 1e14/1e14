import {createNode, Node} from "1e14";

export type In = {
  d_val: string;
  ev_rem: any;
  ev_smp: any;
};

export type Out = {
  d_val: string;
};

export type LocalStorageItem = Node<In, Out>;

export function createLocalStorageItem(key: string): LocalStorageItem {
  return createNode<In, Out>(["d_val"], (outputs) => {
    return {
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
  });
}
