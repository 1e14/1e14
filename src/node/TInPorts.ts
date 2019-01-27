import {TInPort} from "./TInPort";

export type TInPorts<I> = {
  [K in keyof I]: TInPort<I[K]>
};
