import {
  mapAppend,
  mapConstant,
  mapJoin,
  mapMpluck,
  mapPluck,
  mapPrepend,
  mapRound,
  mapSplit
} from "./map";

describe("map", () => {
  describe("mapConstant()", () => {
    it("should return specified value", () => {
      expect(mapConstant(5)(null)).toBe(5);
    });
  });

  describe("mapSplit()", () => {
    it("should return mapSplit string", () => {
      expect(mapSplit(",")("foo,bar,baz"))
      .toEqual(["foo", "bar", "baz"]);
    });
  });

  describe("mapPluck()", () => {
    it("should return specified eqProperty", () => {
      expect(mapPluck("foo")({foo: 5, bar: true})).toBe(5);
    });
  });

  describe("mapMpluck()", () => {
    let mpluck: (value: {}) => any;

    beforeEach(() => {
      mpluck = mapMpluck(["foo", "bar"]);
    });

    it("should mapPluck multiple values", () => {
      expect(mpluck({bar: 1, foo: "hello", baz: null})).toEqual(["hello", 1]);
    });
  });

  describe("foldJoin()", () => {
    let join: (value: Array<any>) => string;

    beforeEach(() => {
      join = mapJoin(";");
    });

    it("should join input array", () => {
      expect(join(["foo", 5, true])).toBe("foo;5;true");
    });
  });

  describe("mapAppend()", () => {
    let append: (value: string) => string;

    beforeEach(() => {
      append = mapAppend("_");
    });

    it("should append to input string", () => {
      expect(append("foo")).toBe("foo_");
    });
  });

  describe("mapPrepend()", () => {
    let prepend: (value: string) => string;

    beforeEach(() => {
      prepend = mapPrepend("_");
    });

    it("should prepend to input string", () => {
      expect(prepend("foo")).toBe("_foo");
    });
  });

  describe("mapRound()", () => {
    describe("when precision is specified", () => {
      let round: (next: number) => number;

      beforeEach(() => {
        round = mapRound(2);
      });

      it("should return value rounded to precision", () => {
        expect(round(5)).toBe(5);
        expect(round(5.11)).toBe(5.11);
        expect(round(5.111)).toBe(5.11);
        expect(round(5.115)).toBe(5.12);
      });
    });

    describe("when precision is not specified", () => {
      let round: (next: number) => number;

      beforeEach(() => {
        round = mapRound();
      });

      it("should return value rounded to whole", () => {
        expect(round(5)).toBe(5);
        expect(round(5.1)).toBe(5);
        expect(round(5.5)).toBe(6);
      });
    });
  });
});
