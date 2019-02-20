import {createNode, Node} from "river-core";

type Out = {
  /**
   * Value coming from stdin.
   */
  d_val: string | Buffer;
};

/**
 * Emits data coming through the standard input (stdin).
 * Environments: Node.js.
 */
export type StdIn = Node<{}, Out>;

let instance: StdIn;

/**
 * Creates a StdIn node.
 * Returns a singleton, ie. subsequent calls to `createStdIn` will return the
 * same object.
 */
export function createStdIn(): StdIn {
  if (!instance) {
    instance = createNode<{}, Out>(["d_val"], (outputs) => {
      process.stdin.on("readable", () => {
        const chunk = process.stdin.read();
        if (chunk !== null) {
          outputs.d_val(chunk);
        }
      });
      return {};
    });

    return instance;
  }
}
