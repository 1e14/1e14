import {INode, TInPorts} from "../../../node";

interface IInputs {
  d_val: string | Buffer;
}

export type TStdErr = INode<IInputs, {}>;

let instance: TStdErr;

export function createStdErr(): TStdErr {
  if (instance) {
    return instance;
  }

  const i: TInPorts<IInputs> = {
    d_val: (value) => {
      process.stderr.write(value);
    }
  };

  instance = {i, o: {}};

  return instance;
}
