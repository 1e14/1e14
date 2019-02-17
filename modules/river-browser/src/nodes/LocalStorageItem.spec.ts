import {connect} from "@protoboard/river";
import {createLocalStorageItem, LocalStorageItem} from "./LocalStorageItem";

describe("createLocalStorageItem", () => {
  const window = <any>global;

  beforeEach(() => {
    window.localStorage = {
      getItem: () => null,
      removeItem: () => null,
      setItem: () => null
    };
  });

  afterEach(() => {
    delete window.localStorage;
  });

  describe("on input (d_val)", () => {
    let node: LocalStorageItem;

    beforeEach(() => {
      node = createLocalStorageItem("foo");
    });

    it("should pass key & value to localhost.setItem()", () => {
      spyOn(window.localStorage, "setItem");
      node.i.d_val("bar", "1");
      expect(window.localStorage.setItem).toHaveBeenCalledWith("foo", "bar");
    });
  });

  describe("on input (ev_rem)", () => {
    let node: LocalStorageItem;

    beforeEach(() => {
      node = createLocalStorageItem("foo");
    });

    it("should pass key to localhost.removeItem()", () => {
      spyOn(window.localStorage, "removeItem");
      node.i.ev_rem(null, "1");
      expect(window.localStorage.removeItem).toHaveBeenCalledWith("foo");
    });
  });

  describe("on input (ev_smp)", () => {
    let node: LocalStorageItem;

    beforeEach(() => {
      node = createLocalStorageItem("foo");
    });

    it("should pass key & value to localhost.setItem()", () => {
      spyOn(window.localStorage, "getItem").and.returnValue("bar");
      const spy = jasmine.createSpy();
      connect(node.o.d_val, spy);
      node.i.ev_smp(null, "1");
      expect(window.localStorage.getItem).toHaveBeenCalledWith("foo");
      expect(spy).toHaveBeenCalledWith("bar", "1");
    });
  });
});
