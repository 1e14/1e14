import {INode, TInPorts} from "../../../node";

interface IInputs {
  d_val: string | Buffer;
}

export type TStdOut = INode<IInputs, {}>;

let instance: TStdOut;

export function createStdOut(): TStdOut {
  if (instance) {
    return instance;
  }

  const i: TInPorts<IInputs> = {
    d_val: (value) => {
      process.stdout.write(value);
    }
  };

  instance = {i, o: {}};

  return instance;
}
