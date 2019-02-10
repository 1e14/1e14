import {TEqualityCallback} from "../nodes";
import {eqProperty} from "./eq";

describe("equal", () => {
  describe("eqProperty", () => {
    describe("when callback is specified", () => {
      let cb: TEqualityCallback<number>;

      beforeEach(() => {
        cb = (a, b) => a % 2 === b % 2;
      });

      describe("when properties match", () => {
        it("should return true", () => {
          expect(eqProperty("foo", cb)({foo: 3}, {foo: 1})).toBe(true);
        });
      });

      describe("when properties don't match", () => {
        it("should return false", () => {
          expect(eqProperty("foo", cb)({foo: 2}, {foo: 1})).toBe(false);
          expect(eqProperty("foo", cb)({}, {foo: 1})).toBe(false);
        });
      });

      describe("when either argument is undefined", () => {
        it("should return undefined", () => {
          expect(eqProperty("foo", cb)(undefined, {foo: 1})).toBeUndefined();
          expect(eqProperty("foo", cb)({foo: 1}, undefined)).toBeUndefined();
        });
      });
    });

    describe("when callback is not specified", () => {
      describe("when properties match", () => {
        it("should return true", () => {
          expect(eqProperty("foo")({foo: 1}, {foo: 1})).toBe(true);
        });
      });

      describe("when properties don't match", () => {
        it("should return false", () => {
          expect(eqProperty("foo")({foo: 2}, {foo: 1})).toBe(false);
          expect(eqProperty("foo")({}, {foo: 1})).toBe(false);
        });
      });

      describe("when either argument is undefined", () => {
        it("should return undefined", () => {
          expect(eqProperty("foo")(undefined, {foo: 1})).toBeUndefined();
          expect(eqProperty("foo")({foo: 1}, undefined)).toBeUndefined();
        });
      });
    });
  });
});
