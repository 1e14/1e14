import {
  foldConcat,
  foldCount, foldFirst,
  foldJoin,
  foldLast,
  foldMax,
  foldMin,
  foldPush,
  foldSum,
  foldUnshift
} from "./fold";

describe("fold", () => {
  describe("foldCount()", () => {
    it("should count inputs", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(foldCount, 0)).toEqual(5);
    });
  });

  describe("foldPush()", () => {
    it("should append items to array", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(foldPush, [])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("foldUnshift()", () => {
    it("should prepend items to array", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(foldUnshift, [])).toEqual([5, 4, 3, 2, 1]);
    });
  });

  describe("foldConcat()", () => {
    it("should concat items to array", () => {
      const input = [[1, 2], [3, 4], [5]];
      expect(input.reduce(foldConcat, [])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("foldLast()", () => {
    it("should return last item", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(foldLast)).toEqual(5);
    });
  });

  describe("foldFirst()", () => {
    it("should return first item", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(foldFirst)).toEqual(1);
    });
  });

  describe("foldJoin()", () => {
    it("should return joined string", () => {
      const input = ["1", "2", "3", "4", "5"];
      expect(input.reduce(foldJoin, "")).toEqual("12345");
    });
  });

  describe("foldSum()", () => {
    it("should return sum", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(foldSum, 0)).toEqual(15);
    });
  });

  describe("foldMin()", () => {
    it("should return minimum item", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(foldMin, Infinity)).toEqual(1);
    });
  });

  describe("foldMax()", () => {
    it("should return maximum item", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(foldMax, -Infinity)).toEqual(5);
    });
  });
});
