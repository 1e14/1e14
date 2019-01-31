import {TOutPort} from "./TOutPort";

/**
 * A bundle of output ports.
 * Every node has exactly one input port bundle and one output port bundle.
 */
export type TOutPorts<O> = {
  [K in keyof O]: TOutPort<O[K]>
};
