import {TInPort} from "./TInPort";
import {TOutPort} from "./TOutPort";

export {INode} from "./INode";
export {TInPorts} from "./TInPorts";
export {TInPort} from "./TInPort";
export {TOutPorts} from "./TOutPorts";
export {TOutPort} from "./TOutPort";
export {TTag} from "./TTag";

export function connect<V>(outPort: TOutPort<V>, inPort: TInPort<V>): void {
  outPort.add(inPort);
}

export function disconnect<V>(outPort: TOutPort<V>, inPort?: TInPort<V>): void {
  if (inPort) {
    outPort.delete(inPort);
  } else {
    outPort.clear();
  }
}
