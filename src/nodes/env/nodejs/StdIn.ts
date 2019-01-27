import {INode} from "../../../node";
import {createOutPorts, createOutputs} from "../../../utils";

interface IOutputs {
  d_val: string | Buffer;
}

export type TStdIn = INode<{}, IOutputs>;

let instance: TStdIn;

export function createStdIn(): TStdIn {
  if (instance) {
    return instance;
  }

  const o = createOutPorts(["d_val"]);
  const outputs = createOutputs(o);

  process.stdin.on("readable", () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
      outputs.d_val(chunk);
    }
  });

  instance = {i: {}, o};

  return instance;
}
