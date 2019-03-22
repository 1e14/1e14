import {connect} from "1e14";
import {createMapper, Mapper} from "./Mapper";

describe("createMapper()", () => {
  describe("on input (d_val)", () => {
    let node: Mapper<number, boolean>;

    beforeEach(() => {
      node = createMapper((value) => value > 5);
    });

    it("should emit on d_val", () => {
      const spy = jasmine.createSpy();
      connect(node.o.d_val, spy);
      node.i.d_val(6, "1");
      expect(spy).toHaveBeenCalledWith(true, "1");
    });
  });
});
