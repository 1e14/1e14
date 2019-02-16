import {createOutPorts} from "./utils";

describe("utils", () => {
  describe("createOutPorts()", () => {
    it("should return output port structure", () => {
      const result = createOutPorts(["foo", "bar"]);
      expect(result).toEqual({
        bar: new Set(),
        foo: new Set()
      });
    });
  });
});
