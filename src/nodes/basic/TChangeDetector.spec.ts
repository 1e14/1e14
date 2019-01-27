import {connect} from "../../node";
import {createChangeDetector, TChangeDetector} from "./TChangeDetector";

describe("createChangeDetector()", () => {
  describe("when callback is specified", () => {
    let node: TChangeDetector<number>;

    beforeEach(() => {
      node = createChangeDetector((a, b) => a % 2 === b % 2);
    });

    describe("on input (d_val)", () => {
      describe("when not equal to foldLast value", () => {
        beforeEach(() => {
          node.i.d_val(5, "1");
        });

        it("should emit true", () => {
          const spy = jasmine.createSpy();
          connect(node.o.d_eq, spy);
          node.i.d_val(4, "2");
          expect(spy).toHaveBeenCalledWith(true, "2");
        });
      });

      describe("when equal to foldLast value", () => {
        beforeEach(() => {
          node.i.d_val(5, "1");
        });

        it("should emit false", () => {
          const spy = jasmine.createSpy();
          connect(node.o.d_eq, spy);
          node.i.d_val(7, "2");
          expect(spy).toHaveBeenCalledWith(false, "2");
        });
      });

      describe("when callback throws", () => {
        beforeEach(() => {
          node = createChangeDetector(() => {
            throw new Error();
          });
        });

        it("should bounce input", () => {
          const spy = jasmine.createSpy();
          connect(node.o.b_d_val, spy);
          node.i.d_val(4, "2");
          expect(spy).toHaveBeenCalledWith(4, "2");
        });

        it("should emit error", () => {
          const spy = jasmine.createSpy();
          connect(node.o.ev_err, spy);
          node.i.d_val(4, "2");
          expect(spy).toHaveBeenCalledWith("Error", "2");
        });
      });
    });
  });

  describe("when callback is not specified", () => {
    let node: TChangeDetector<number>;

    beforeEach(() => {
      node = createChangeDetector();
    });

    describe("on input (d_val)", () => {
      describe("when different than foldLast value", () => {
        beforeEach(() => {
          node.i.d_val(5, "1");
        });

        it("should emit true", () => {
          const spy = jasmine.createSpy();
          connect(node.o.d_eq, spy);
          node.i.d_val(4, "2");
          expect(spy).toHaveBeenCalledWith(true, "2");
        });
      });

      describe("when same as foldLast value", () => {
        beforeEach(() => {
          node.i.d_val(5, "1");
        });

        it("should emit false", () => {
          const spy = jasmine.createSpy();
          connect(node.o.d_eq, spy);
          node.i.d_val(5, "2");
          expect(spy).toHaveBeenCalledWith(false, "2");
        });
      });
    });
  });
});
