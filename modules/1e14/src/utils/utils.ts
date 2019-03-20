import {InPort, InPorts, Node, OutPort, OutPorts, Outputs} from "../types";

/**
 * Creates a node based on the specified output port names and input port
 * collection generator function.
 * @param outFields List of output port names.
 * @param createInPorts Creates a set of input ports.
 */
export function createNode<I, O>(
  outFields: Array<keyof O>,
  createInPorts: (outputs: Outputs<O>) => InPorts<I>
): Node<I, O> {
  const o = <OutPorts<O>>{};
  const outputs = <Outputs<O>>{};
  for (const field of outFields) {
    o[field] = new Set();
  }
  for (const field in o) {
    const inPorts = o[field];
    outputs[field] = (value, tag) => {
      for (const inPort of inPorts) {
        inPort(value, tag);
      }
    };
  }
  const i: InPorts<I> = createInPorts(outputs);
  return {i, o};
}

/**
 * Establishes a connection between an output port and an input port. Data
 * emitted on an output port are automatically forwarded to connected input
 * ports.
 * @param outPort
 * @param inPort
 */
export function connect<V>(outPort: OutPort<V>, inPort: InPort<V>): void {
  outPort.add(inPort);
}

/**
 * Tears down the connection between the specified ports, or, when the input
 * port is omitted, tears down all downstream connections of the output port.
 * @param outPort
 * @param inPort
 */
export function disconnect<V>(outPort: OutPort<V>, inPort?: InPort<V>): void {
  if (inPort) {
    outPort.delete(inPort);
  } else {
    outPort.clear();
  }
}
