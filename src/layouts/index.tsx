import React from 'react';
import { Layout, Menu } from 'antd';
import { TeamOutlined, UserOutlined } from '@ant-design/icons';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

import Header from '@/layouts/Header';
import { handleHeightChange } from '@/components/Message';
import PureComponent from '@/common/pure-component';

interface States {
  collapsed: boolean;
}

interface Props {
  location?: {
    pathname: string;
  };
}

class BasicLayout extends PureComponent<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
    };
    handleHeightChange(document.body.clientHeight);
  }

  onCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <SubMenu key="sub1" icon={<UserOutlined />} title="核心业务">
                <Menu.Item key="1">会议管理</Menu.Item>
                <Menu.Item key="2">云上文档</Menu.Item>
                <Menu.Item key="3">待办工作</Menu.Item>
                <Menu.Item key="4">系统设置</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="统计分析" />
              <SubMenu key="sub3" icon={<TeamOutlined />} title="系统管理" />
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header />
            <Content style={{ margin: '0 16px' }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, height: '100%' }}
              >
                {this.props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Copyright© 上海皮图麦信息科技有限公司
              版权所有ICP证：沪ICP备16032772号
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default BasicLayout;
