import {connect} from "@kwaia/mote";
import * as net from "net";
import {createRemoteOutTcp, TRemoteOutTcp} from "./RemoteOutTcp";

describe("createRemoteOutTcp()", () => {
  describe("on input (d_val)", () => {
    let node: TRemoteOutTcp<number>;
    let onError: (error) => void;
    let onWrite: () => void;
    const socket = {
      connect: () => null,
      on: (event, cb) => {
        switch (event) {
          case "error":
            onError = cb;
            break;
        }
      },
      write: (data, cb) => {
        onWrite = cb;
      }
    };

    beforeEach(() => {
      spyOn(net, "Socket").and.returnValue(socket);
      node = createRemoteOutTcp("localhost", 8888, "1");
    });

    it("should invoke socket#write()", () => {
      const spy = spyOn(socket, "write").and.callThrough();
      node.i.d_val(5, "1");
      expect(spy.calls.argsFor(0)[0])
      .toEqual(JSON.stringify({id: "1", tag: "1", value: 5}));
    });

    describe("on error", () => {
      beforeEach(() => {
        node = createRemoteOutTcp("localhost", 8888, "1");
        node.i.d_val(5, "1");
      });

      it("should bounce d_val", () => {
        const spy = jasmine.createSpy();
        connect(node.o.b_d_val, spy);
        onError(new Error());
        onWrite();
        expect(spy).toHaveBeenCalledWith(5, "1");
      });

      it("should emit on ev_err", () => {
        const spy = jasmine.createSpy();
        connect(node.o.ev_err, spy);
        onError(new Error());
        onWrite();
        expect(spy).toHaveBeenCalledWith("Error", undefined);
      });
    });
  });
});
