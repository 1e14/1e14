import {INode, TInPorts} from "../../../node";

interface IInputs {
  /**
   * Value to be sent to stdout.
   */
  d_val: string | Buffer;
}

/**
 * Forwards input to standard output (stdout).
 * Environments: Node.js.
 */
export type TStdOut = INode<IInputs, {}>;

let instance: TStdOut;

/**
 * Creates a StdOut node.
 * Returns a singleton, ie. subsequent calls to `createStdOut` will return the
 * same object.
 */
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
