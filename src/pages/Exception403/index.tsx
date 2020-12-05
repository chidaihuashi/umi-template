import React from 'react';
import { Link } from 'umi';
import { Result, Button } from 'antd';

import PureComponent from '@/common/pure-component';

class Index extends PureComponent {
  render() {
    return (
      <div>
        <Result
          status="403"
          title="403"
          style={{
            background: 'none',
          }}
          subTitle="抱歉，您无权访问此页面。"
          extra={
            <Link to="/">
              <Button type="primary">回到首页</Button>
            </Link>
          }
        />
      </div>
    );
  }
}

export default Index;
