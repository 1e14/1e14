import {TInPorts} from "./TInPorts";
import {TOutPorts} from "./TOutPorts";

export interface INode<I, O> {
  i: TInPorts<I>;
  o: TOutPorts<O>;
}
