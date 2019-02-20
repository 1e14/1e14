import {Output} from "./Output";

export type Outputs<O> = {
  [K in keyof O]: Output<O[K]>
};
