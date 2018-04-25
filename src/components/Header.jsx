import React, { PureComponent } from 'react';
import { Balloon, Icon } from '@icedesign/base';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';
import FoundationSymbol from 'foundation-symbol';
import { Link } from 'react-router';
import { headerNavs } from './../navs';
import SessionUtil from '../utils/SessionUtil';
import Logo from './Logo';

export default class Header extends PureComponent {
  render() {
    const { width, theme } = this.props;
    const Operator = SessionUtil.getUserNo;
    return (
      <Layout.Header
        theme={theme}
        className="ice-design-layout-header"
        style={{ width }}
      >
        <Logo />
        <div
          className="ice-design-layout-header-menu"
          style={{ display: 'flex' }}
        >
          {/* Header 菜单项 begin */}
          {headerNavs && headerNavs.length > 0 ? (
            <Menu mode="horizontal" selectedKeys={[]}>
              {headerNavs.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.to;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.to;
                } else {
                  linkProps.to = nav.to;
                }
                return (
                  <Menu.Item key={idx}>
                    <Link {...linkProps}>
                      {nav.icon ? (
                        <FoundationSymbol type={nav.icon} size="small" />
                      ) : null}
                      {nav.text}
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}
          <span style={{color:'#fff',marginRight:80}}>当前仓库：测试仓库1</span>
          <span style={{color:'#fff',marginRight:80}}>当前操作人员：系统管理员</span>
          <span style={{color:'#fff'}}>
            <Link to="/login">
              <FoundationSymbol type="compass" size="small" />退出
            </Link>
          </span>
        </div>
      </Layout.Header>
    );
  }
}
