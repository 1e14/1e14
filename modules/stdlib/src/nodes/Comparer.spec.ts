import {connect} from "../../../1e14";
import {Comparer, createComparer} from "./Comparer";

describe("createComparer()", () => {
  describe("with callback", () => {
    describe("on input (d_vals)", () => {
      let node: Comparer<number>;

      beforeEach(() => {
        node = createComparer((a, b) => a === b);
      });

      it("should emit on d_eq", () => {
        const spy = jasmine.createSpy();
        connect(node.o.d_eq, spy);
        node.i.d_vals({a: 5, b: 5}, "1");
        expect(spy).toHaveBeenCalledWith(true, "1");
      });

      describe("when callback throws", () => {
        beforeEach(() => {
          node = createComparer(() => {
            throw new Error();
          });
        });

        it("should bounce d_vals", () => {
          const spy = jasmine.createSpy();
          connect(node.o.b_d_vals, spy);
          node.i.d_vals({a: 5, b: 5}, "1");
          expect(spy).toHaveBeenCalledWith({a: 5, b: 5}, "1");
        });

        it("should emit on ev_err", () => {
          const spy = jasmine.createSpy();
          connect(node.o.ev_err, spy);
          node.i.d_vals({a: 5, b: 5}, "1");
          expect(spy).toHaveBeenCalledWith("Error", "1");
        });
      });
    });
  });

  describe("without callback", () => {
    describe("on input (d_vals)", () => {
      let node: Comparer<number>;

      beforeEach(() => {
        node = createComparer();
      });

      it("should emit on d_eq", () => {
        const spy = jasmine.createSpy();
        connect(node.o.d_eq, spy);
        node.i.d_vals({a: 5, b: 5}, "1");
        expect(spy).toHaveBeenCalledWith(true, "1");
      });
    });
  });
});
