import {createOutPorts, createOutputs, Node} from "river-core";

type Outputs = {
  /**
   * Value coming from stdin.
   */
  d_val: string | Buffer;
};

/**
 * Emits data coming through the standard input (stdin).
 * Environments: Node.js.
 */
export type StdIn = Node<{}, Outputs>;

let instance: StdIn;

/**
 * Creates a StdIn node.
 * Returns a singleton, ie. subsequent calls to `createStdIn` will return the
 * same object.
 */
export function createStdIn(): StdIn {
  if (instance) {
    return instance;
  }

  const o = createOutPorts(["d_val"]);
  const outputs = createOutputs(o);

  process.stdin.on("readable", () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
      outputs.d_val(chunk);
    }
  });

  instance = {i: {}, o};

  return instance;
}
