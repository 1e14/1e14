import {Socket} from "net";
import {createNode, Node, Tag} from "../../../1e14";

export type In<V> = {
  /**
   * Value to be sent to remote node.
   */
  d_val: V;
};

export type Out<V> = {
  /**
   * Bounced input value.
   */
  b_d_val: V;

  /**
   * Error message.
   */
  ev_err: string;
};

/**
 * Sends data to a RemoteInTcp node on a remote server through CP connection.
 * Bounces input, and emits error on socket error.
 */
export type RemoteOutTcp<V> = Node<In<V>, Out<V>>;

const socketCache: Map<string, Socket> = new Map();

/**
 * Creates a RemoteOutTcp node.
 * @param host Address of remote server.
 * @param port Port of the remote server.
 * @param id Identifies RemoteInTcp node on remote server.
 */
export function createRemoteOutTcp<V>(host: string, port: number, id: string): RemoteOutTcp<V> {
  return createNode<In<V>, Out<V>>(["b_d_val", "ev_err"], (outputs) => {
    const inputCache: Set<{ tag: Tag, value: any }> = new Set();

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

    return {
      d_val: (value, tag) => {
        const wrapped = {value, tag};
        inputCache.add(wrapped);
        socket.write(JSON.stringify({id, tag, value}), () => {
          inputCache.delete(wrapped);
        });
      }
    };
  });
}
