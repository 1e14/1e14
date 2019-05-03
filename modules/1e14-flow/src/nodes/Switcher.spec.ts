import {connect} from "1e14";
import {createSwitcher, Switcher} from "./Switcher";

describe("createSwitcher()", () => {
  describe("on input (all)", () => {
    let node: Switcher<"foo" | "bar" | "baz", number>;

    beforeEach(() => {
      node = createSwitcher(["foo", "bar", "baz"]);
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
  });

  describe("on input (d_val)", () => {
    let node: Switcher<"foo" | "bar" | "baz", number>;

    beforeEach(() => {
      node = createSwitcher(["foo", "bar", "baz"], "bar");
    });

    it("should forward to current position", () => {
      const foo = jasmine.createSpy();
      const bar = jasmine.createSpy();
      const baz = jasmine.createSpy();
      connect(node.o.foo, foo);
      connect(node.o.bar, bar);
      connect(node.o.baz, baz);
      node.i.d_val(5, "1");
      expect(foo).not.toHaveBeenCalled();
      expect(bar).toHaveBeenCalledWith(5, "1");
      expect(baz).not.toHaveBeenCalled();
    });
  });
});
