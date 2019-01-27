import {connect} from "../../node";
import {createDemuxer, TDemuxer} from "./TDemuxer";

describe("createDemuxer()", () => {
  describe("on input (d_mux)", () => {
    let node: TDemuxer<{ foo: number, bar: number }>;

    beforeEach(() => {
      node = createDemuxer(["foo", "bar"]);
    });

    it("should emit on specified port", () => {
      const spy = jasmine.createSpy();
      connect(node.o.bar, spy);
      node.i.d_mux({field: "bar", value: 5}, "1");
      expect(spy).toHaveBeenCalledWith(5, "1");
    });
  });
});
