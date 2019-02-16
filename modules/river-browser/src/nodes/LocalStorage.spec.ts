import {connect} from "@protoboard/river";
import {createLocalStorage, TLocalStorage} from "./LocalStorage";

describe("createLocalStorage", () => {
  const window = <any>global;

  beforeEach(() => {
    window.localStorage = {
      clear: () => null,
      getItem: () => null,
      removeItem: () => null,
      setItem: () => null
    };
  });

  afterEach(() => {
    delete window.localStorage;
  });

  it("should return singleton", () => {
    expect(createLocalStorage()).toBe(createLocalStorage());
  });

  describe("on data (clear)", () => {
    let node: TLocalStorage;

    beforeEach(() => {
      node = createLocalStorage();
    });

    it("should pass key & value to localhost.setItem()", () => {
      spyOn(window.localStorage, "clear");
      node.i.clear(null);
      expect(window.localStorage.clear).toHaveBeenCalled();
    });
  });

  describe("on data (getItem)", () => {
    let node: TLocalStorage;

    beforeEach(() => {
      node = createLocalStorage();
    });

    it("should pass key & value to localhost.setItem()", () => {
      spyOn(window.localStorage, "getItem").and.returnValue("bar");
      const spy = jasmine.createSpy();
      connect(node.o.getItem, spy);
      node.i.getItem("foo", "1");
      expect(spy).toHaveBeenCalledWith("bar", "1");
    });
  });

  describe("on data (removeItem)", () => {
    let node: TLocalStorage;

    beforeEach(() => {
      node = createLocalStorage();
    });

    it("should pass key & value to localhost.setItem()", () => {
      spyOn(window.localStorage, "removeItem");
      node.i.removeItem("foo", "1");
      expect(window.localStorage.removeItem).toHaveBeenCalledWith("foo");
    });
  });

  describe("on data (setItem)", () => {
    let node: TLocalStorage;

    beforeEach(() => {
      node = createLocalStorage();
    });

    it("should pass key & value to localhost.setItem()", () => {
      spyOn(window.localStorage, "setItem");
      node.i.setItem(["foo", "bar"], "1");
      expect(window.localStorage.setItem).toHaveBeenCalledWith("foo", "bar");
    });
  });
});
