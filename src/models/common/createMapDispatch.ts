import { Dispatch } from '@@/plugin-dva/connect';
import _ from 'lodash';

function createMapDispatch(
  dispatch: Dispatch,
  actions: { [name: string]: Function },
) {
  const r: { [name: string]: Function } = {};
  _.forEach(actions, (fn: Function, key: string) => {
    r[key] = fn.bind(fn, dispatch);
  });
  return r;
}

export default createMapDispatch;
