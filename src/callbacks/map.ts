import {TMapperCallback} from "../nodes/basic";

export function constant(value: any): TMapperCallback<any, any> {
  return () => value;
}

export function split(delimiter: string): TMapperCallback<string, Array<string>> {
  return (next: string) => next.split(delimiter);
}

export function pluck<T>(property: string): TMapperCallback<T, T[keyof T]> {
  return (value: T) => value[property];
}

export function mpluck(fields: Array<string>): (next: {}) => any {
  return (next: {}) => {
    const result = [];
    for (const field of fields) {
      result.push(next[field]);
    }
    return result;
  };
}

export function join(delimiter: string): (next: Array<string>) => string {
  return (next: Array<string>) => {
    return next.join(delimiter);
  };
}

export function append(postfix: string): (next: string) => string {
  return (next: string) => {
    return next + postfix;
  };
}

export function prepend(prefix: string): (next: string) => string {
  return (next: string) => {
    return prefix + next;
  };
}

export function round(precision?: number): (next: number) => number {
  const factor = Math.pow(10, precision);
  return precision ?
    (next: number) => {
      return Math.round(next * factor) / factor;
    } :
    Math.round;
}
