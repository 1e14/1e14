import {TMapperCallback} from "../nodes/basic";

export function mapConstant(value: any): TMapperCallback<any, any> {
  return () => value;
}

export function mapSplit(delimiter: string): TMapperCallback<string, Array<string>> {
  return (next: string) => next.split(delimiter);
}

export function mapPluck<T>(property: string): TMapperCallback<T, T[keyof T]> {
  return (value: T) => value[property];
}

export function mapMpluck(fields: Array<string>): (next: {}) => any {
  return (next: {}) => {
    const result = [];
    for (const field of fields) {
      result.push(next[field]);
    }
    return result;
  };
}

export function mapJoin(delimiter: string): (next: Array<string>) => string {
  return (next: Array<string>) => {
    return next.join(delimiter);
  };
}

export function mapAppend(postfix: string): (next: string) => string {
  return (next: string) => {
    return next + postfix;
  };
}

export function mapPrepend(prefix: string): (next: string) => string {
  return (next: string) => {
    return prefix + next;
  };
}

export function mapRound(precision?: number): (next: number) => number {
  const factor = Math.pow(10, precision);
  return precision ?
    (next: number) => {
      return Math.round(next * factor) / factor;
    } :
    Math.round;
}
