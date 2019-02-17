import {
  createOutPorts,
  createOutputs,
  InPorts,
  Node,
  Tag
} from "@protoboard/river";

export type MapperCallback<I, O> = (value: I, tag?: Tag) => O;

export type Inputs<I> = {
  /**
   * Value to be mapped.
   */
  d_val: I;
};

export type Outputs<I, O> = {
  /**
   * Bounced input value.
   */
  b_d_val: I;

  /**
   * Mapped value.
   */
  d_val: O;

  /**
   * Error message.
   */
  ev_err: string;
};

/**
 * Maps input value according to mapper callback.
 * Bounces input, and emits error on callback exception.
 * @example
 * river = require("@protoboard/river");
 * mapper = river.createMapper(next => 2 * next);
 * river.connect(mapper.o.d_val, console.log);
 * mapper.i.d_val(5); // logs: 10
 */
export type Mapper<I, O> = Node<Inputs<I>, Outputs<I, O>>;

/**
 * Creates a Mapper node.
 * @param cb Mapper callback.
 */
export function createMapper<I, O>(cb: MapperCallback<I, O>): Mapper<I, O> {
  const o = createOutPorts(["b_d_val", "d_val", "ev_err"]);
  const outputs = createOutputs(o);

  const i: InPorts<Inputs<I>> = {
    d_val: (value, tag) => {
      try {
        outputs.d_val(cb(value, tag), tag);
      } catch (err) {
        outputs.b_d_val(value, tag);
        outputs.ev_err(String(err), tag);
      }
    }
  };

  return {i, o};
}
