import { combineEpics } from 'redux-observable';
import { AnyEpic } from '@vh/core/store/contracts';

export const mergeEpic = (...epics: AnyEpic[]) => {
  return combineEpics(...epics);
};
