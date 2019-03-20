import {Server, Socket} from "net";
import {
  createNode,
  InPorts,
  Node,
  Outputs as OutputCallbacks
} from "../../../1e14";

export type Out<V> = {
  /**
   * Value received from remote node.
   */
  d_val: V;

  /**
   * Error message.
   */
  ev_err: string;
};

/**
 * Receives data from a RemoteOutTcp node on a remote server through CP
 * connection.
 * Emits error on JSON parsing error.
 */
export type RemoteInTcp<V> = Node<{}, Out<V>>;

const serverCache: Map<string, Server> = new Map();
const outputCache: Map<string, OutputCallbacks<Out<any>>> = new Map();

/**
 * Creates a RemoteInTcp node.
 * @param host Address of the local CP server.
 * @param port Port of the local CP server.
 * @param id Identifies this node.
 */
export function createRemoteInTcp<V>(host: string, port: number, id: string): RemoteInTcp<V> {
  return createNode<{}, Out<V>>(["d_val", "ev_err"], (outputs) => {
    outputCache.set(id, outputs);

    const serverId = `${host}:${port}`;
    if (!serverCache.get(serverId)) {
      serverCache.set(serverId, createServer(host, port));
    }

    return <InPorts<{}>>{};
  });
}

function createServer(host: string, port: number): Server {
  const server = new Server();
  server.listen(port, host);
  server.on("connection", (socket: Socket) => {
    socket.on("data", (data: string) => {
      try {
        const {id, tag, value} = JSON.parse(data);
        const outputs = outputCache.get(id);
        if (outputs) {
          outputs.d_val(value, tag);
        }
      } catch (err) {
        for (const outputs of outputCache.values()) {
          outputs.ev_err(String(err));
        }
      }
    });
  });
  return server;
}
