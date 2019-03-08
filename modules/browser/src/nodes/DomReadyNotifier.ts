import {createNode, Node} from "river-core";

export type In = {};

export type Out = {
  ev_ready: any;
};

export type DomReadyNotifier = Node<In, Out>;

let instance: DomReadyNotifier;

export function createDomReadyNotifier(): DomReadyNotifier {
  if (!instance) {
    instance = createNode<In, Out>(["ev_ready"], (outputs) => {
      document.addEventListener("DOMContentLoaded", () => {
        outputs.ev_ready(null, "DomReady");
      });

      return {};
    });
  }

  return instance;
}
