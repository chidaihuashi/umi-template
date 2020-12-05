import React from 'react';
import { Link } from 'umi';
import { Result, Button } from 'antd';

import PureComponent from '@/common/pure-component';

export default class NotFound extends PureComponent {
  render() {
    return (
      <>
        <Result
          status="404"
          title="404"
          style={{
            background: 'none',
          }}
          subTitle="抱歉，您访问的页面不存在。"
          extra={
            <Link to="/">
              <Button type="primary">回到首页</Button>
            </Link>
          }
        />
      </>
    );
  }
}
