import {connect} from "../node";
import {createUnfolder, TUnfolder} from "./Unfolder";

describe("createUnfolder()", () => {
  describe("on input (d_fold)", () => {
    let node: TUnfolder<Array<number>, number>;

    beforeEach(() => {
      node = createUnfolder(function* (value) {
        value = value.slice();
        while (value.length > 0) {
          yield value.shift();
        }
      });
    });

    it("should emit on d_val", () => {
      const spy = jasmine.createSpy();
      connect(node.o.d_val, spy);
      node.i.d_fold([1, 2, 3], "1");
      expect(spy.calls.allArgs()).toEqual([
        [1, "1"],
        [2, "1"],
        [3, "1"]
      ]);
    });

    describe("when callback throws", () => {
      beforeEach(() => {
        node = createUnfolder(function* () {
          throw new Error();
        });
      });

      it("should bounce d_fold", () => {
        const spy = jasmine.createSpy();
        connect(node.o.b_d_fold, spy);
        node.i.d_fold([1, 2, 3], "1");
        expect(spy).toHaveBeenCalledWith([1, 2, 3], "1");
      });

      it("should emit on ev_err", () => {
        const spy = jasmine.createSpy();
        connect(node.o.ev_err, spy);
        node.i.d_fold([1, 2, 3], "1");
        expect(spy).toHaveBeenCalledWith("Error", "1");
      });
    });
  });
});
