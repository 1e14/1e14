import {INode, TInPorts} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";

export interface IInputs<P extends string | number, V> {
  d_val: V;
  st_pos: P;
}

export type TSwitchPositions<P extends string | number, V> = {
  [K in P]: V;
};

export type TOutputs<P extends string | number, V> =
  TSwitchPositions<P, V> & { b_st_pos: P; };

export type TSwitch<P extends string | number, V> =
  INode<IInputs<P, V> & { all: IInputs<P, V> }, TOutputs<P, V>>;

/**
 * TODO: Remove <any> typecasts once TS supports string patterns in types
 * @link https://github.com/Microsoft/TypeScript/issues/12754
 */
export function createSwitch<P extends string | number, V>(
  positions: Array<P>,
  position?: P
): TSwitch<P, V> {
  const o = createOutPorts((<Array<keyof TOutputs<P, V>>>positions).concat("b_st_pos"));
  const outputs = createOutputs<TOutputs<P, V>>(o);

  const positionSet = new Set(positions);

  const i: TInPorts<IInputs<P, V> & { all: IInputs<P, V> }> = {
    all: ({d_val, st_pos}, tag) => {
      if (positionSet.has(st_pos)) {
        position = st_pos;
        outputs[position](<any>d_val, tag);
      } else {
        outputs.b_st_pos(<any>st_pos, tag);
      }
    },

    d_val: (value, tag) => {
      outputs[position](<any>value, tag);
    },

    st_pos: (value, tag) => {
      if (positionSet.has(value)) {
        position = value;
      } else {
        outputs.b_st_pos(<any>value, tag);
      }
    }
  };

  return {i, o};
}
