export interface IMuxed<T> {
  field: keyof T;
  value: T[keyof T];
}
