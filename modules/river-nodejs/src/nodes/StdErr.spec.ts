import {createStdErr, StdErr} from "./StdErr";

describe("createStdErr", () => {
  it("should be singleton", () => {
    expect(createStdErr()).toBe(createStdErr());
  });

  describe("on input (d_val)", () => {
    let node: StdErr;

    beforeEach(() => {
      node = createStdErr();
    });

    it("should write to stderr", () => {
      spyOn(process.stderr, "write");
      node.i.d_val("foo");
      expect(process.stderr.write).toHaveBeenCalledWith("foo");
    });
  });
});
