import { push } from 'react-router-redux';
import cookies from 'react-cookies';

import { loginSuccess } from '@/models/auth/action';
import { Dispatch } from '@@/plugin-dva/connect';
import fetch3 from '@/common/utils/fetch3';

interface LoginOptions {
  readonly username: string;
  readonly password: string;
  readonly rememberMe?: boolean;
  readonly redirectTo?: Location | string;
}

async function login(dispatch: Dispatch, options: LoginOptions) {
  const { username, password, rememberMe } = options;
  const res = await fetch3.jupiter.post('login', { username, password });
  if (!res.success) {
    return { success: false, error: res.err };
  }
  if (rememberMe) {
    cookies.save('USER-INFO', { username, password }, { path: '/' });
  } else {
    cookies.remove('USER-INFO');
  }
  dispatch(push(options?.redirectTo || '/'));
  dispatch(loginSuccess(res.user));
}

export { login, LoginOptions };
