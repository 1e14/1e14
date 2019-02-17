import {InPorts, Node} from "@protoboard/river";

type Inputs = {
  /**
   * Value to be sent to stderr.
   */
  d_val: string | Buffer;
};

/**
 * Forwards input to standard error output (stderr).
 * Environments: Node.js.
 */
export type StdErr = Node<Inputs, {}>;

let instance: StdErr;

/**
 * Creates a StdErr node.
 * Returns a singleton, ie. subsequent calls to `createStdErr` will return the
 * same object.
 * @example
 * river = require("@protoboard/river");
 * stdErr = river.createStdErr();
 * stdErr.i.d_val("foo"); // writes to stderr: "foo"
 */
export function createStdErr(): StdErr {
  if (instance) {
    return instance;
  }

  const i: InPorts<Inputs> = {
    d_val: (value) => {
      process.stderr.write(value);
    }
  };

  instance = {i, o: {}};

  return instance;
}
