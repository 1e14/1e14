import {connect} from "1e14";
import {createStdIn, StdIn} from "./StdIn";

describe("createStdIn", () => {
  it("should be singleton", () => {
    expect(createStdIn()).toBe(createStdIn());
  });

  describe("on stdin readable", () => {
    let node: StdIn;

    beforeEach(() => {
      node = createStdIn();
    });

    it("should emit on d_val", () => {
      spyOn(process.stdin, "read").and.returnValue("foo");
      const spy = jasmine.createSpy();
      connect(node.o.d_val, spy);
      process.stdin.emit("readable");
      expect(spy).toHaveBeenCalledWith("foo", undefined);
    });
  });
});
