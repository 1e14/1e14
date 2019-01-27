import {TTag} from "./TTag";

export type TInPort<V> = (value: V, tag?: TTag) => void;
