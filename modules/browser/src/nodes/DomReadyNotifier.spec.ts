import {connect} from "../../../1e14";
import {createDomReadyNotifier, DomReadyNotifier} from "./DomReadyNotifier";

describe("createDomReadyNotifier()", () => {
  const window = <any>global;
  let onDomContentLoaded: () => void;

  beforeEach(() => {
    window.document = {
      addEventListener: (event, cb) => {
        switch (event) {
          case "DOMContentLoaded":
            onDomContentLoaded = cb;
            break;
        }
      }
    };
  });

  afterEach(() => {
    delete window.document;
  });

  describe("on DOMContentLoaded", () => {
    let node: DomReadyNotifier;

    beforeEach(() => {
      node = createDomReadyNotifier();
    });

    it("should emit on 'd_val'", () => {
      const spy = jasmine.createSpy();
      connect(node.o.ev_ready, spy);
      onDomContentLoaded();
      expect(spy).toHaveBeenCalledWith(null, "DomReady");
    });
  });
});
