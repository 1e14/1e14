import {noop} from "../utils";
import {connect, disconnect, TInPort, TOutPort} from "./index";

describe("connect", () => {
  let outPort: TOutPort<number>;
  let inPort: TInPort<number>;

  beforeEach(() => {
    outPort = new Set();
    inPort = noop;
  });

  it("should add port to connections", () => {
    connect(outPort, inPort);
    expect(outPort.has(inPort)).toBeTruthy();
  });
});

describe("disconnect", () => {
  let outPort: TOutPort<number>;
  let inPort1: TInPort<number>;
  let inPort2: TInPort<number>;

  beforeEach(() => {
    outPort = new Set();
    inPort1 = () => null;
    inPort2 = () => null;
    connect(outPort, inPort1);
    connect(outPort, inPort2);
  });

  describe("on specifying port", () => {
    it("should remove port from connections", () => {
      disconnect(outPort, inPort1);
      expect(outPort.has(inPort1)).toBeFalsy();
      expect(outPort.has(inPort2)).toBeTruthy();
    });
  });

  describe("on omitting port", () => {
    it("should remove all ports from connections", () => {
      disconnect(outPort);
      expect(outPort.size).toBe(0);
    });
  });
});
