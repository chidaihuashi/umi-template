import _ from 'lodash';

import { State } from '@/reducers/index';

const PersistentStorageKey = ['authorize'];
const StoreKey = 'REDUX_STORE';
const store: any = {};

function getKey(key: string) {
  return `${StoreKey}_${key}`.toUpperCase();
}

function getInitialState() {
  const results: any = {};
  _.forEach(PersistentStorageKey, key => {
    const value = localStorage.getItem(getKey(key));
    if (value) {
      results[key] = JSON.parse(value);
    }
  });
  return results;
}

function onStateChange(state: State) {
  _.forEach(state, (value, key) => {
    if (!PersistentStorageKey.includes(key)) {
      return;
    }
    if (value !== store[key]) {
      localStorage.setItem(getKey(key), JSON.stringify(value));
    }
  });
}

export { getInitialState, onStateChange };
