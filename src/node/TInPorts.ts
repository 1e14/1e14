import {TInPort} from "./TInPort";

/**
 * A bundle of input ports.
 * Every node has exactly one input port bundle and one output port bundle.
 */
export type TInPorts<I> = {
  [K in keyof I]: TInPort<I[K]>
};
