import {createStdOut, TStdOut} from "./TStdOut";

describe("createStdOut", () => {
  it("should be singleton", () => {
    expect(createStdOut()).toBe(createStdOut());
  });

  describe("on input (d_val)", () => {
    let node: TStdOut;

    beforeEach(() => {
      node = createStdOut();
    });

    it("should write to stdout", () => {
      spyOn(process.stdout, "write");
      node.i.d_val("foo");
      expect(process.stdout.write).toHaveBeenCalledWith("foo");
    });
  });
});
