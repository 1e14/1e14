import {Tag} from "1e14";

export type ReducerCallback<I, O> = (
  curr: O,
  next: I,
  tag?: Tag) => O;
