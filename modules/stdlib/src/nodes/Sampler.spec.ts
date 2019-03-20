import {connect} from "../../../1e14";
import {createSampler, Sampler} from "./Sampler";

describe("createSampler()", () => {
  describe("on input (ev_smp)", () => {
    let node: Sampler<number>;

    beforeEach(() => {
      node = createSampler();
      node.i.d_val(5, "1");
    });

    it("should emit on d_val", () => {
      const spy = jasmine.createSpy();
      connect(node.o.d_val, spy);
      node.i.ev_smp(null, "2");
      expect(spy).toHaveBeenCalledWith(5, "2");
    });
  });
});
