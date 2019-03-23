import {connect} from "1e14";
import {createTicker, Ticker} from "./Ticker";

describe("createTicker()", () => {
  describe("on input (st_ticking)", () => {
    let node: Ticker;

    beforeEach(() => {
      node = createTicker(100);
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    describe("passing true", () => {
      it("should start interval", () => {
        const spy = jasmine.createSpy();
        connect(node.o.ev_tick, spy);
        node.i.st_ticking(true);
        expect(spy).not.toHaveBeenCalled();
        jasmine.clock().tick(101);
        expect(spy).toHaveBeenCalledWith(undefined, undefined);
      });
    });

    describe("passing false", () => {
      beforeEach(() => {
        node.i.st_ticking(true);
      });

      it("should stop interval", () => {
        const spy = jasmine.createSpy();
        connect(node.o.ev_tick, spy);
        node.i.st_ticking(false);
        jasmine.clock().tick(101);
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });
});
