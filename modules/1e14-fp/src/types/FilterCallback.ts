import {Tag} from "1e14";

export type FilterCallback<V> = (value: V, tag?: Tag) => boolean;
