import {INode, TInPorts} from "@protoboard/river";

interface IInputs {
  /**
   * Value to be sent to stdout.
   */
  d_val: string | Buffer;
}

/**
 * Forwards input to standard output (stdout).
 * Environments: Node.js.
 * @example
 * river = require("@protoboard/river");
 * stdOut = river.createStdOut();
 * stdOut.i.d_val("foo"); // writes to stdout: "foo"
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
