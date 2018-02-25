import { Epic } from 'redux-observable';
import { AnyAction } from 'redux';

export type AnyEpic = Epic<AnyAction, any>;
