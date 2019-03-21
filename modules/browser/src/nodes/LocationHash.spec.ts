import {connect} from "1e14";
import {createLocationHash, LocationHash} from "./LocationHash";

describe("createLocationHash()", () => {
  const window = <any>global;
  let onDomContentLoaded: () => void;
  let onHashChange: () => void;

  beforeEach(() => {
    window.location = {};
    window.document = {
      addEventListener: (event, cb) => {
        switch (event) {
          case "DOMContentLoaded":
            onDomContentLoaded = cb;
            break;
        }
      }
    };
    window.window = {
      addEventListener: (event, cb) => {
        switch (event) {
          case "hashchange":
            onHashChange = cb;
            break;
        }
      }
    };
  });

  afterEach(() => {
    delete window.location;
    delete window.document;
    delete window.window;
  });

  describe("on input (d_val)", () => {
    let node: LocationHash;

    beforeEach(() => {
      node = createLocationHash();
    });

    it("should set location.hash", () => {
      node.i.d_val("foo", "1");
      expect(window.location.hash).toBe("foo");
    });
  });

  describe("on input (ev_smp)", () => {
    let node: LocationHash;

    beforeEach(() => {
      node = createLocationHash();
      window.location.hash = "bar";
    });

    it("should emit on 'd_val'", () => {
      const spy = jasmine.createSpy();
      connect(node.o.d_val, spy);
      node.i.ev_smp(null, "1");
      expect(spy).toHaveBeenCalledWith("bar", "1");
    });
  });

  describe("on DOMContentLoaded", () => {
    let node: LocationHash;

    beforeEach(() => {
      node = createLocationHash();
      window.location.hash = "bar";
    });

    it("should emit on 'd_val'", () => {
      const spy = jasmine.createSpy();
      connect(node.o.d_val, spy);
      onDomContentLoaded();
      const args = spy.calls.mostRecent().args;
      expect(args[0]).toBe("bar");
      expect(args[1]).toMatch(/LocationHash-\d+/);
    });
  });

  describe("on hashchange", () => {
    let node: LocationHash;

    beforeEach(() => {
      node = createLocationHash();
      window.location.hash = "bar";
    });

    it("should emit on 'd_val'", () => {
      const spy = jasmine.createSpy();
      connect(node.o.d_val, spy);
      onHashChange();
      const args = spy.calls.mostRecent().args;
      expect(args[0]).toBe("bar");
      expect(args[1]).toMatch(/LocationHash-\d+/);
    });
  });
});
