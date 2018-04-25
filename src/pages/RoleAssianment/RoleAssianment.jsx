import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import PermissionPanel from './components/PermissionPanel/PermissionPanel'
import './RoleAssianment.scss';
import IceContainer from '@icedesign/container';
export default class RoleAssianment extends Component {
  static displayName = '角色权限分配';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '权限管理', link: '' },
      { text: '角色权限分配', link: '#/stock/list' },
    ];
    return (
      <div className="tag-list-page">
        {/* <CustomBreadcrumb dataSource={breadcrumb} /> */}
        <IceContainer>
          <PermissionPanel/>
        </IceContainer>
      </div>
    );
  }
}
