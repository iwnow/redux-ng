import { Observable } from 'rxjs/Observable';
import { AnyAction } from 'redux';
import { map } from 'rxjs/operators';
import { UnaryFunction } from 'rxjs/interfaces';

export const epicMap: UnaryFunction<any, any> = (...args) => {
  console.log(...args);
  return null;
};
