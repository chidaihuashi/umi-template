import { createLogger } from 'redux-logger';
import { message } from 'antd';
import { getInitialState, onStateChange } from '@/reducers/store';

export const dva = {
  config: {
    initialState: getInitialState(),
    onAction: createLogger(),
    onStateChange,
    onError(e: Error) {
      message.error(e.message, 3);
    },
  },
};
