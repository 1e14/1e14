import {INode, TInPorts} from "../../../node";

interface IInputs {
  /**
   * Value to be sent to stderr.
   */
  d_val: string | Buffer;
}

/**
 * Forwards input to standard error output (stderr).
 * Environments: Node.js.
 */
export type TStdErr = INode<IInputs, {}>;

let instance: TStdErr;

/**
 * Creates a StdErr node.
 * Returns a singleton, ie. subsequent calls to `createStdErr` will return the
 * same object.
 */
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
