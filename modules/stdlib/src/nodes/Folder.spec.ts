import {connect} from "1e14";
import {createFolder, Folder} from "./Folder";

describe("createFolder()", () => {
  describe("when initialized", () => {
    describe("on input (all)", () => {
      let node: Folder<number, number>;

      beforeEach(() => {
        node = createFolder((curr, next) => curr + next, 0);
      });

      describe("when ev_res is true", () => {
        beforeEach(() => {
          node.i.all({d_val: 5, ev_res: false}, "1");
          node.i.all({d_val: 3, ev_res: false}, "2");
        });

        it("should emit on d_fold", () => {
          const spy = jasmine.createSpy();
          connect(node.o.d_fold, spy);
          node.i.all({d_val: 4, ev_res: true}, "3");
          expect(spy).toHaveBeenCalledWith(12, "3");
        });
      });

      describe("when callback throws", () => {
        beforeEach(() => {
          node = createFolder(() => {
            throw new Error();
          }, 0);
        });

        it("should bounce d_val", () => {
          const spy = jasmine.createSpy();
          connect(node.o.b_d_val, spy);
          node.i.all({d_val: 5, ev_res: false}, "1");
          expect(spy).toHaveBeenCalledWith(5, "1");
        });

        it("should emit on ev_err", () => {
          const spy = jasmine.createSpy();
          connect(node.o.ev_err, spy);
          node.i.all({d_val: 5, ev_res: false}, "1");
          expect(spy).toHaveBeenCalledWith("Error", "1");
        });
      });
    });

    describe("on input (d_val)", () => {
      let node: Folder<number, number>;

      beforeEach(() => {
        node = createFolder((curr, next) => curr + next, 0);
      });

      describe("when callback throws", () => {
        beforeEach(() => {
          node = createFolder(() => {
            throw new Error();
          }, 0);
        });

        it("should bounce d_val", () => {
          const spy = jasmine.createSpy();
          connect(node.o.b_d_val, spy);
          node.i.d_val(5, "1");
          expect(spy).toHaveBeenCalledWith(5, "1");
        });

        it("should emit on ev_err", () => {
          const spy = jasmine.createSpy();
          connect(node.o.ev_err, spy);
          node.i.d_val(5, "1");
          expect(spy).toHaveBeenCalledWith("Error", "1");
        });
      });
    });

    describe("on input (ev_res)", () => {
      let node: Folder<number, number>;

      beforeEach(() => {
        node = createFolder((curr, next) => curr + next, 0);
      });

      describe("when truthy", () => {
        beforeEach(() => {
          node.i.ev_res(false, "1");
          node.i.d_val(5, "2");
          node.i.d_val(3, "3");
        });

        it("should emit on d_fold", () => {
          const spy = jasmine.createSpy();
          connect(node.o.d_fold, spy);
          node.i.ev_res(true, "4");
          expect(spy).toHaveBeenCalledWith(8, "4");
        });
      });

      describe("when falsy", () => {
        beforeEach(() => {
          node.i.ev_res(false, "1");
          node.i.d_val(5, "2");
          node.i.d_val(3, "3");
        });

        it("should not emit on d_fold", () => {
          const spy = jasmine.createSpy();
          connect(node.o.d_fold, spy);
          node.i.ev_res(false, "4");
          expect(spy).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe("when uninitialized", () => {
    describe("on input (all)", () => {
      let node: Folder<number, number>;

      beforeEach(() => {
        node = createFolder((curr, next) => curr + next);
      });

      describe("for first", () => {
        describe("when ev_res is true", () => {
          it("should emit on d_fold", () => {
            const spy = jasmine.createSpy();
            connect(node.o.d_fold, spy);
            node.i.all({d_val: 5, ev_res: true}, "3");
            expect(spy).toHaveBeenCalledWith(5, "3");
          });
        });
      });

      describe("for rest", () => {
        describe("when ev_res is true", () => {
          beforeEach(() => {
            node.i.all({d_val: 5, ev_res: false}, "1");
            node.i.all({d_val: 3, ev_res: false}, "2");
          });

          it("should emit on d_fold", () => {
            const spy = jasmine.createSpy();
            connect(node.o.d_fold, spy);
            node.i.all({d_val: 4, ev_res: true}, "3");
            expect(spy).toHaveBeenCalledWith(12, "3");
          });
        });

        describe("when callback throws", () => {
          beforeEach(() => {
            node = createFolder(() => {
              throw new Error();
            });
            node.i.all({d_val: 5, ev_res: false}, "1");
          });

          it("should bounce d_val", () => {
            const spy = jasmine.createSpy();
            connect(node.o.b_d_val, spy);
            node.i.all({d_val: 4, ev_res: false}, "2");
            expect(spy).toHaveBeenCalledWith(4, "2");
          });

          it("should emit on ev_err", () => {
            const spy = jasmine.createSpy();
            connect(node.o.ev_err, spy);
            node.i.all({d_val: 4, ev_res: false}, "2");
            expect(spy).toHaveBeenCalledWith("Error", "2");
          });
        });
      });
    });

    describe("on input (d_val)", () => {
      let node: Folder<number, number>;

      beforeEach(() => {
        node = createFolder((curr, next) => curr + next);
      });

      describe("for rest", () => {
        describe("when callback throws", () => {
          beforeEach(() => {
            node = createFolder(() => {
              throw new Error();
            });
            node.i.d_val(5, "1");
          });

          it("should bounce d_val", () => {
            const spy = jasmine.createSpy();
            connect(node.o.b_d_val, spy);
            node.i.d_val(4, "2");
            expect(spy).toHaveBeenCalledWith(4, "2");
          });

          it("should emit on ev_err", () => {
            const spy = jasmine.createSpy();
            connect(node.o.ev_err, spy);
            node.i.d_val(4, "2");
            expect(spy).toHaveBeenCalledWith("Error", "2");
          });
        });
      });
    });

    describe("on input (ev_res)", () => {
      let node: Folder<number, number>;

      beforeEach(() => {
        node = createFolder((curr, next) => curr + next);
      });

      describe("when truthy", () => {
        beforeEach(() => {
          node.i.ev_res(false, "1");
          node.i.d_val(5, "2");
          node.i.d_val(3, "3");
        });

        it("should emit on d_fold", () => {
          const spy = jasmine.createSpy();
          connect(node.o.d_fold, spy);
          node.i.ev_res(true, "4");
          expect(spy).toHaveBeenCalledWith(8, "4");
        });
      });

      describe("when falsy", () => {
        beforeEach(() => {
          node.i.ev_res(false, "1");
          node.i.d_val(5, "2");
          node.i.d_val(3, "3");
        });

        it("should not emit on d_fold", () => {
          const spy = jasmine.createSpy();
          connect(node.o.d_fold, spy);
          node.i.ev_res(false, "4");
          expect(spy).not.toHaveBeenCalled();
        });
      });
    });
  });
});
