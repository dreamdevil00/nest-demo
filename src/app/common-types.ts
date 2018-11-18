import { DeepPartial } from 'typeorm';

export type DataObject<T extends object> = T | DeepPartial<T>;

export interface AnyObject {
  [property: string]: any;
}
export type Options = AnyObject;

export type Callback<T> = (
  err: Error | string | null | undefined,
  result?: T,
) => void;

export type Entity = Function;
