import {connect} from "@protoboard/river";
import {createDiverter, TDiverter} from "./Diverter";

describe("createDiverter()", () => {
  describe("on input (all)", () => {
    let node: TDiverter<"foo" | "bar" | "baz", number>;

    beforeEach(() => {
      node = createDiverter(["foo", "bar", "baz"]);
    });

    it("should forward to specified output", () => {
      const foo = jasmine.createSpy();
      const bar = jasmine.createSpy();
      const baz = jasmine.createSpy();
      connect(node.o.foo, foo);
      connect(node.o.bar, bar);
      connect(node.o.baz, baz);
      node.i.all({d_val: 5, st_pos: "bar"}, "1");
      expect(foo).not.toHaveBeenCalled();
      expect(bar).toHaveBeenCalledWith(5, "1");
      expect(baz).not.toHaveBeenCalled();
    });

    describe("on invalid st_pos", () => {
      it("should bounce st_pos", () => {
        const spy = jasmine.createSpy();
        connect(node.o.b_st_pos, spy);
        node.i.all({st_pos: <any>"quux", d_val: 5}, "1");
        expect(spy).toHaveBeenCalledWith("quux", "1");
      });
    });
  });

  describe("on input (d_val)", () => {
    let node: TDiverter<"foo" | "bar" | "baz", number>;

    beforeEach(() => {
      node = createDiverter(["foo", "bar", "baz"], "foo");
    });

    it("should forward to current position", () => {
      const spy = jasmine.createSpy();
      connect(node.o.foo, spy);
      node.i.d_val(5, "1");
      expect(spy).toHaveBeenCalledWith(5, "1");
    });
  });

  describe("on input (st_pos)", () => {
    let node: TDiverter<"foo" | "bar" | "baz", number>;

    beforeEach(() => {
      node = createDiverter(["foo", "bar", "baz"], "foo");
    });

    describe("on invalid st_pos", () => {
      it("should bounce st_pos", () => {
        const spy = jasmine.createSpy();
        connect(node.o.b_st_pos, spy);
        node.i.st_pos(<any>"quux", "1");
        expect(spy).toHaveBeenCalledWith("quux", "1");
      });
    });
  });
});
