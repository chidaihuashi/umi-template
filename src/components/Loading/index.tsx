import React from 'react';
import { Spin } from 'antd';
import s from './index.less';
import PureComponent from '@/common/pure-component';

class Loading extends PureComponent {
  render() {
    return <Spin tip="Loading..." className={s.root} />;
  }
}

export default Loading;
