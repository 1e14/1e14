import {InPort, OutPort} from "../types";
import {connect, createNode, disconnect} from "./utils";

describe("utils", () => {
  describe("createNode()", () => {
    it("should return output port structure", () => {
      const result = createNode(["bar"], (outputs) => ({
        foo: (value, tag) => {
          outputs.bar(value, tag);
        }
      }));
      expect(result.o).toEqual({
        bar: new Set()
      });
      expect(typeof result.i.foo).toBe("function");
    });
  });

  describe("connect", () => {
    let outPort: OutPort<number>;
    let inPort: InPort<number>;

    beforeEach(() => {
      outPort = new Set();
      inPort = () => null;
    });

    it("should add port to connections", () => {
      connect(outPort, inPort);
      expect(outPort.has(inPort)).toBeTruthy();
    });
  });

  describe("disconnect", () => {
    let outPort: OutPort<number>;
    let inPort1: InPort<number>;
    let inPort2: InPort<number>;

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
});
