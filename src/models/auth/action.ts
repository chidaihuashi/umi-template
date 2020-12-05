import { States, User } from '@/models/auth/model';

export function loginSuccess(user: User, state?: States) {
  return {
    type: 'authorize/login',
    payload: {
      user,
      ...state,
    },
  };
}
