import {connect} from "@protoboard/river";
import {createShifter, Shifter} from "./Shifter";

describe("createShifter()", () => {
  describe("on input (d_val)", () => {
    let node: Shifter<number>;

    beforeEach(() => {
      node = createShifter();
      node.i.d_val(5, "1");
    });

    it("should emit last input on d_val", () => {
      const spy = jasmine.createSpy();
      connect(node.o.d_val, spy);
      node.i.d_val(3, "2");
      expect(spy).toHaveBeenCalledWith(5, "2");
    });
  });
});
