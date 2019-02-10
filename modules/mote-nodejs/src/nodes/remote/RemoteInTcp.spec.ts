import {connect} from "@kwaia/mote";
import * as net from "net";
import {createRemoteInTcp, TRemoteInTcp} from "./RemoteInTcp";

describe("createRemoteInTcp()", () => {
  describe("on data", () => {
    let node: TRemoteInTcp<number>;
    let onData: (data) => void;
    const socket = {
      on: (event, cb) => {
        switch (event) {
          case "data":
            onData = cb;
            break;
        }
      }
    };
    let onConnection: (socket) => void;
    const server = {
      listen: () => null,
      on: (event, cb) => {
        switch (event) {
          case "connection":
            onConnection = cb;
            break;
        }
      }
    };

    beforeEach(() => {
      spyOn(net, "Server").and.returnValue(server);
      node = createRemoteInTcp("localhost", 8888, "1");
      onConnection(socket);
    });

    it("should emit on d_val", () => {
      const spy = jasmine.createSpy();
      connect(node.o.d_val, spy);
      onData(JSON.stringify({id: "1", tag: "1", value: 5}));
      expect(spy).toHaveBeenCalledWith(5, "1");
    });

    describe("on parse error", function () {
      const data = "foo";

      it("should not emit on d_val", () => {
        const spy = jasmine.createSpy();
        connect(node.o.d_val, spy);
        onData(data);
        expect(spy).not.toHaveBeenCalled();
      });

      it("should emit on ev_err", () => {
        const spy = jasmine.createSpy();
        connect(node.o.ev_err, spy);
        onData(data);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe("on invalid id", () => {
      it("should not emit on d_val", () => {
        const spy = jasmine.createSpy();
        connect(node.o.d_val, spy);
        onData(JSON.stringify({id: "2", tag: "1", value: 5}));
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });
});
