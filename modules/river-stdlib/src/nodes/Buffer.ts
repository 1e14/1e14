import {
  createOutPorts,
  createOutputs,
  InPorts,
  Node,
  Tag
} from "@protoboard/river";

export type Inputs<V> = {
  /**
   * Value to be buffered.
   */
  d_val: V;

  /**
   * Whether the buffer is open.
   */
  st_open: boolean;
};

export type Outputs<V> = {
  /**
   * Forwarded value.
   */
  d_val: V;

  /**
   * Current buffer size. Non-zero when only when buffer is closed.
   */
  st_size: number;
};

/**
 * Buffers values.
 * When the buffer is closed, it stores input values. When the buffer is
 * open it releases stored values and forwards input value.
 * Operates with either independent or joined inputs.
 * @example
 * river = require("@protoboard/river");
 * buffer = river.createBuffer(false);
 * river.connect(buffer.o.d_val, console.log);
 * buffer.i.d_val("a");
 * buffer.i.d_val("b");
 * buffer.i.st_open(true); // logs: "a", "b"
 * buffer.i.d_val("c"); // logs: "c"
 */
export type Buffer<V> = Node<Inputs<V> & { all: Inputs<V> }, Outputs<V>>;

/**
 * Creates a Buffer node.
 * @param open Whether buffer is open initially.
 */
export function createBuffer<V>(open?: boolean): Buffer<V> {
  const o = createOutPorts(["d_val", "st_size"]);
  const outputs = createOutputs(o);

  const buffer: Array<{ value: V, tag: Tag }> = [];

  const i: InPorts<Inputs<V> & { all: Inputs<V> }> = {
    all: ({d_val, st_open}, tag) => {
      if (st_open && !open) {
        flush();
      }
      open = st_open;
      if (open) {
        outputs.d_val(d_val, tag);
      } else {
        buffer.push({value: d_val, tag});
      }
      outputs.st_size(buffer.length, tag);
    },

    d_val: (value, tag) => {
      if (open) {
        outputs.d_val(value, tag);
      } else {
        buffer.push({value, tag});
      }
      outputs.st_size(buffer.length, tag);
    },

    st_open: (value, tag) => {
      if (value && !open) {
        flush();
      }
      open = value;
      outputs.st_size(buffer.length, tag);
    }
  };

  function flush() {
    const d_val = outputs.d_val;
    while (buffer.length) {
      const next = buffer.shift();
      d_val(next.value, next.tag);
    }
  }

  return {i, o};
}
