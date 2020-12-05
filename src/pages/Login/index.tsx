import React from 'react';
import { Input, message, Checkbox } from 'antd';
import { connect } from 'dva';
import queryString from 'query-string';
import cookies from 'react-cookies';

import s from './index.less';
import { State } from '@/reducers';
import { Dispatch } from '@@/plugin-dva/connect';
import { createMapDispatch } from '@/models/common';
import { login, LoginOptions } from '@/pages/Login/action';
import PureComponent from '@/common/pure-component';

interface Props {
  login: (options: LoginOptions) => any;
  authorize: any;
  location: Location;
}

interface States {}

class Login extends PureComponent<Props, States> {
  username: string;

  password: string;

  rememberMe: boolean;

  handleUserNameChange: (arg1: any) => void;

  handlePassWordChange: (arg1: any) => void;

  constructor(props: any) {
    super(props);
    const user = cookies.load('USER-INFO');
    this.login = this.login.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleUserNameChange = this.handleInputChange.bind(this, 'username');
    this.handlePassWordChange = this.handleInputChange.bind(this, 'password');
    this.username = user?.username || '';
    this.password = user?.password || '';
    this.rememberMe = (user?.username && user?.password) || false;
  }

  handleInputChange(fieldName: 'username' | 'password', event: any) {
    this[fieldName] = event.target.value;
  }

  handleCheckboxChange(event: any) {
    this.rememberMe = event.target.checked;
  }

  async login() {
    const {
      username,
      password,
      rememberMe,
      props: {
        location: { search },
      },
    } = this;
    if (!username?.trim().length) {
      return message.error('请输入用户名');
    }
    if (!password?.trim().length) {
      return message.error('请输入密码');
    }
    const parsedQuery: any = queryString.parse(search);
    const res: any = await this.props.login({
      username,
      password,
      rememberMe,
      redirectTo: parsedQuery?.redirectTo || '/',
    });
    if (res?.error) {
      message.error(res?.error);
    }
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.loginBox}>
          <div className={s.left}>
            <div className={s.welcomeLogin}>
              <p className={s.p1}>登录</p>
              <p className={s.p2}>LOGIN</p>
            </div>
            <div className={s.inputArea}>
              <Input
                defaultValue={this.username}
                className={s.input}
                placeholder="请输入用户名"
                onChange={this.handleUserNameChange}
              />
              <Input.Password
                defaultValue={this.password}
                className={s.input}
                placeholder="请输入您的登陆密码"
                onChange={this.handlePassWordChange}
              />
            </div>
            <div className={s.rememberBox}>
              <Checkbox
                onChange={this.handleCheckboxChange}
                defaultChecked={this.rememberMe}
              />
              <div>记住用户名和密码</div>
            </div>
            <div className={s.bottom}>
              <div className={s.loginBtn} onClick={this.login}>
                立即登录
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state: State) {
  return {
    authorize: state.authorize,
  };
}

function mapDispatch(dispatch: Dispatch) {
  return createMapDispatch(dispatch, { login });
}

export default connect(mapState, mapDispatch)(Login);
