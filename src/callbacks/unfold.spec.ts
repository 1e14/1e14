import {TUnfolderCallback} from "../nodes/basic";
import * as unfold from "./unfold";

describe("unfold", () => {
  describe("pop()", () => {
    it("should unfold array", () => {
      const iterator = unfold.pop([1, 2, 3]);
      expect([...iterator]).toEqual([3, 2, 1]);
    });

    it("should leave original input intact", () => {
      const array = [1, 2, 3];
      const iterator = unfold.pop(array);
      for (const item of iterator) {
        //
      }
      expect(array).toEqual([1, 2, 3]);
    });
  });

  describe("shift()", () => {
    it("should unfold array", () => {
      const iterator = unfold.shift([1, 2, 3]);
      expect([...iterator]).toEqual([1, 2, 3]);
    });

    it("should leave original input intact", () => {
      const array = [1, 2, 3];
      const iterator = unfold.shift(array);
      for (const item of iterator) {
        //
      }
      expect(array).toEqual([1, 2, 3]);
    });
  });

  describe("split()", () => {
    it("should return string fragments", () => {
      const split = unfold.split("\n");
      const iterable = split("foo\nbar\nbaz");
      expect([...iterable]).toEqual(["foo", "bar"]);
    });

    describe("on subsequent calls", () => {
      let split: TUnfolderCallback<string, string>;
      let iterable: IterableIterator<string>;

      beforeEach(() => {
        split = unfold.split("\n");
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
