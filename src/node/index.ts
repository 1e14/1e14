import {TInPort} from "./TInPort";
import {TOutPort} from "./TOutPort";

export {INode} from "./INode";
export {TInPorts} from "./TInPorts";
export {TInPort} from "./TInPort";
export {TOutPorts} from "./TOutPorts";
export {TOutPort} from "./TOutPort";
export {TTag} from "./TTag";

/**
 * Establishes a connection between an output port and an input port. Data
 * emitted on an output port are automatically forwarded to connected input
 * ports.
 * @param outPort
 * @param inPort
 */
export function connect<V>(outPort: TOutPort<V>, inPort: TInPort<V>): void {
  outPort.add(inPort);
}

/**
 * Tears down the connection between the specified ports, or, when the input
 * port is omitted, tears down all downstream connections of the output port.
 * @param outPort
 * @param inPort
 */
export function disconnect<V>(outPort: TOutPort<V>, inPort?: TInPort<V>): void {
  if (inPort) {
    outPort.delete(inPort);
  } else {
    outPort.clear();
  }
}
