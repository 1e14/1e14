import {Tag} from "1e14";

export type MapperCallback<I, O> = (value: I, tag?: Tag) => O;
