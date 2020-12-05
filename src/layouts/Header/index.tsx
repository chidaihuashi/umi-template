import React from 'react';
import s from '../index.less';
import PureComponent from '@/common/pure-component';

class Header extends PureComponent {
  render() {
    return <div className={s.headerRoot}>首页</div>;
  }
}

export default Header;
