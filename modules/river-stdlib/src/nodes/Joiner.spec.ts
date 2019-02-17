import {connect} from "@protoboard/river";
import {createJoiner, Joiner} from "./Joiner";

describe("createJoiner()", () => {
  describe("on input", () => {
    let node: Joiner<{ foo: number, bar: number }>;

    beforeEach(() => {
      node = createJoiner(["foo", "bar"]);
    });

    describe("on input (before first full set)", () => {
      it("should not emit on all", () => {
        const spy = jasmine.createSpy();
        connect(node.o.all, spy);
        node.i.foo(5, "1");
        node.i.bar(3, "2");
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe("on input (full set)", () => {
      beforeEach(() => {
        node.i.foo(5, "1");
        node.i.bar(3, "2");
      });

      it("should emit on all", () => {
        const spy = jasmine.createSpy();
        connect(node.o.all, spy);
        node.i.foo(4, "2");
        expect(spy).toHaveBeenCalledWith({foo: 4, bar: 3}, "2");
      });
    });
  });
});
