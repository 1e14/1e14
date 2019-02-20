import {Tag} from "./Tag";

export type Output<V> = (value: V, tag?: Tag) => void;
