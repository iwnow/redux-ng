import { AnyAction, Reducer } from 'redux';
import { AnyEpic } from './any-epic';

export abstract class DuckServiceBase {
  protected abstract actions: { [key: string]: string };
  abstract get epic(): AnyEpic;
  abstract get reducer(): Reducer<any>;

  abstract withActionScope(scoper: (action: string) => string);
}
