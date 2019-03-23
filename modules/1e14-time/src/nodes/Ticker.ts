import {createNode, Node} from "1e14";
import Timer = NodeJS.Timer;

export type In = {
  /**
   * Whether the ticker is ticking.
   */
  st_ticking: boolean;
};

export type Out = {
  /**
   * Tick signal.
   */
  ev_tick: any;
};

/**
 * Emits a signal at predefined intervals when ticking.
 * @link https://github.com/1e14/1e14/wiki/Ticker
 */
export type Ticker = Node<In, Out>;

/**
 * Creates a Ticker node.
 * @param ms Number of milliseconds between ticks.
 * @param active Whether the ticker is ticking initially.
 */
export function createTicker(ms: number, active: boolean = false): Ticker {
  let timer: Timer;
  return createNode<In, Out>(["ev_tick"], (outputs) => ({
    st_ticking: (value) => {
      if (!active && value) {
        timer = setInterval(outputs.ev_tick, ms);
        active = true;
      } else if (active && !value) {
        clearInterval(timer);
        active = false;
      }
    }
  }));
}
