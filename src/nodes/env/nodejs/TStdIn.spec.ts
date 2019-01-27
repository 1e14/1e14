import {connect} from "../../../node";
import {createStdIn, TStdIn} from "./TStdIn";

describe("createStdIn", () => {
  it("should be singleton", () => {
    expect(createStdIn()).toBe(createStdIn());
  });

  describe("on stdin readable", () => {
    let node: TStdIn;

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
