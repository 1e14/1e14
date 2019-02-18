import {UnfolderCallback} from "../nodes";
import {unfoldPop, unfoldShift, unfoldSplit} from "./unfold";

describe("unfold", () => {
  describe("unfoldPop()", () => {
    it("should unfold array", () => {
      const iterator = unfoldPop([1, 2, 3]);
      expect([...iterator]).toEqual([3, 2, 1]);
    });

    it("should leave original input intact", () => {
      const array = [1, 2, 3];
      const iterator = unfoldPop(array);
      for (const item of iterator) {
        //
      }
      expect(array).toEqual([1, 2, 3]);
    });
  });

  describe("unfoldShift()", () => {
    it("should unfold array", () => {
      const iterator = unfoldShift([1, 2, 3]);
      expect([...iterator]).toEqual([1, 2, 3]);
    });

    it("should leave original input intact", () => {
      const array = [1, 2, 3];
      const iterator = unfoldShift(array);
      for (const item of iterator) {
        //
      }
      expect(array).toEqual([1, 2, 3]);
    });
  });

  describe("mapSplit()", () => {
    it("should return string fragments", () => {
      const split = unfoldSplit("\n");
      const iterable = split("foo\nbar\nbaz");
      expect([...iterable]).toEqual(["foo", "bar"]);
    });

    describe("on subsequent calls", () => {
      let split: UnfolderCallback<string, string>;
      let iterable: IterableIterator<string>;

      beforeEach(() => {
        split = unfoldSplit("\n");
        iterable = split("foo\nba");
        for (const item of iterable) {
          //
        }
      });

      it("should preserve fragment", () => {
        iterable = split("r\nbaz");
        expect([...iterable]).toEqual(["bar"]);
      });
    });
  });
});
