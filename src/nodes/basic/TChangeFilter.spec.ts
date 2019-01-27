import {connect} from "../../node";
import {createChangeFilter, TChangeFilter} from "./TChangeFilter";

describe("createChangeFilter", () => {
  describe("when callback is specified", () => {
    let node: TChangeFilter<number>;

    beforeEach(() => {
      node = createChangeFilter((a, b) => a % 2 === b % 2);
    });

    describe("on input (d_val)", () => {
      beforeEach(() => {
        node.i.d_val(3, "1");
      });

      describe("when not equal to last value", () => {
        it("should forward d_val", () => {
          const spy = jasmine.createSpy();
          connect(node.o.d_val, spy);
          node.i.d_val(4, "2");
          expect(spy).toHaveBeenCalledWith(4, "2");
        });
      });

      describe("when equal to last value", () => {
        it("should not forward d_val", () => {
          const spy = jasmine.createSpy();
          connect(node.o.d_val, spy);
          node.i.d_val(5, "2");
          expect(spy).not.toHaveBeenCalled();
        });
      });

      describe("when callback throws", () => {
        beforeEach(() => {
          node = createChangeFilter(() => {
            throw new Error();
          });
        });

        it("should emit on b_d_val", () => {
          const spy = jasmine.createSpy();
          connect(node.o.b_d_val, spy);
          node.i.d_val(4, "2");
          expect(spy).toHaveBeenCalledWith(4, "2");
        });

        it("should emit on ev_err", () => {
          const spy = jasmine.createSpy();
          connect(node.o.ev_err, spy);
          node.i.d_val(4, "2");
          expect(spy).toHaveBeenCalledWith("Error", "2");
        });
      });
    });
  });

  describe("when callback is not specified", () => {
    let node: TChangeFilter<number>;

    beforeEach(() => {
      node = createChangeFilter();
      node.i.d_val(3, "1");
    });

    describe("when different than last value", () => {
      it("should forward d_val", () => {
        const spy = jasmine.createSpy();
        connect(node.o.d_val, spy);
        node.i.d_val(4, "2");
        expect(spy).toHaveBeenCalledWith(4, "2");
      });
    });

    describe("when same as last value", () => {
      it("should not forward d_val", () => {
        const spy = jasmine.createSpy();
        connect(node.o.d_val, spy);
        node.i.d_val(3, "2");
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });
});
