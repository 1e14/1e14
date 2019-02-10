import {INode, TInPorts} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";

export interface IInputs<V> {
  /**
   * Value to be forwarded.
   */
  d_val: V;

  /**
   * Whether gate is open.
   */
  st_open: boolean;
}

export interface IOutputs<V> {
  /**
   * Forwarded value.
   */
  d_val: V;
}

/**
 * Forwards input value when gate is open.
 * Operates with either independent or joined inputs.
 * @example
 * mote = require("@kwaia/mote");
 * gate = mote.createGate(false);
 * mote.connect(gate.o.d_val, console.log);
 * gate.i.d_val("a");
 * gate.i.st_open(true);
 * gate.i.d_val("b"); // logs: "b"
 */
export type TGate<V> = INode<IInputs<V> & { all: IInputs<V> }, IOutputs<V>>;

/**
 * Creates a Gate node.
 * @param open Initial 'open' state.
 */
export function createGate<V>(open?: boolean): TGate<V> {
  const o = createOutPorts(["d_val"]);
  const outputs = createOutputs(o);

  const i: TInPorts<IInputs<V> & { all: IInputs<V> }> = {
    all: ({d_val, st_open}, tag) => {
      if (st_open) {
        outputs.d_val(d_val, tag);
      }
    },

    d_val: (value, tag) => {
      if (open) {
        outputs.d_val(value, tag);
      }
    },

    st_open: (value) => {
      open = value;
    }
  };

  return {i, o};
}
