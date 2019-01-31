import {TInPorts} from "./TInPorts";
import {TOutPorts} from "./TOutPorts";

/**
 * Single node, atomic or composite.
 * Nodes expose input and output ports that may be connected to each other.
 * @see connect
 */
export interface INode<I, O> {
  i: TInPorts<I>;
  o: TOutPorts<O>;
}
