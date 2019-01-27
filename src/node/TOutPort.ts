import {TInPort} from "./TInPort";

export type TOutPort<V> = Set<TInPort<V>>;
