import {Socket} from "net";
import {INode, TInPorts, TTag} from "../../node";
import {createOutPorts, createOutputs} from "../../utils";

export interface IInputs<V> {
  d_val: V;
}

export interface IOutputs<V> {
  b_d_val: V;
  ev_err: string;
}

export type TRemoteOutTcp<V> = INode<IInputs<V>, IOutputs<V>>;

const socketCache: Map<string, Socket> = new Map();

export function createRemoteOutTcp<V>(host: string, port: number, id: string): TRemoteOutTcp<V> {
  const o = createOutPorts(["b_d_val", "ev_err"]);
  const outputs = createOutputs(o);
  const inputCache: Set<{ tag: TTag, value: any }> = new Set();

  const socketId = `${host}:${port}`;
  let socket: Socket = socketCache[socketId];
  if (!socket) {
    socket = socketCache[socketId] = new Socket();
    socket.connect(port, host);
  }

  socket.on("error", (err) => {
    // bouncing in-flight inputs
    const b_d_val = outputs.b_d_val;
    for (const {value, tag} of inputCache) {
      b_d_val(value, tag);
    }
    inputCache.clear();

    // emitting error
    outputs.ev_err(String(err));
  });

  const i: TInPorts<IInputs<V>> = {
    d_val: (value, tag) => {
      const wrapped = {value, tag};
      inputCache.add(wrapped);
      socket.write(JSON.stringify({id, tag, value}), () => {
        inputCache.delete(wrapped);
      });
    }
  };

  return {i, o};
}
