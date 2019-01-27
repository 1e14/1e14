import * as fold from "./fold";

describe("fold", () => {
  describe("count()", () => {
    it("should count inputs", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(fold.count, 0)).toEqual(5);
    });
  });

  describe("push()", () => {
    it("should append items to array", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(fold.push, [])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("unshift()", () => {
    it("should prepend items to array", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(fold.unshift, [])).toEqual([5, 4, 3, 2, 1]);
    });
  });

  describe("concat()", () => {
    it("should concat items to array", () => {
      const input = [[1, 2], [3, 4], [5]];
      expect(input.reduce(fold.concat, [])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("last()", () => {
    it("should return last item", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(fold.last)).toEqual(5);
    });
  });

  describe("join()", () => {
    it("should return joined string", () => {
      const input = ["1", "2", "3", "4", "5"];
      expect(input.reduce(fold.join, "")).toEqual("12345");
    });
  });

  describe("sum()", () => {
    it("should return sum", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(fold.sum, 0)).toEqual(15);
    });
  });

  describe("min()", () => {
    it("should return minimum item", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(fold.min, Infinity)).toEqual(1);
    });
  });

  describe("max()", () => {
    it("should return maximum item", () => {
      const input = [1, 2, 3, 4, 5];
      expect(input.reduce(fold.max, -Infinity)).toEqual(5);
    });
  });
});
