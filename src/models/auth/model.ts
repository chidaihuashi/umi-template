interface User {
  id: number;
}

interface AuthorizeState {
  user?: User;
  authorized?: boolean;
  username?: string;
  password?: string;
}

interface Reducers {
  login: (state: AuthorizeState, action: any) => any;
}

interface AuthAction extends GeneralAction {
  payload: Object;
  error?: string | Error;
}

const state: AuthorizeState = {};

const reducers: Reducers = {
  login: (state: AuthorizeState, action: AuthAction) => {
    return {
      authorized: !action.error,
      ...action.payload,
    };
  },
};

export default {
  namespace: 'authorize',
  state,
  reducers,
};

export { User, AuthorizeState, Reducers };
