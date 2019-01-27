import {TOutPort} from "./TOutPort";

export type TOutPorts<O> = {
  [K in keyof O]: TOutPort<O[K]>
};
