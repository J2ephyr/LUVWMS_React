import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import RoleList from './components/RoleList/RoleList'
import './Role.scss';
import IceContainer from '@icedesign/container';

export default class Role extends Component {
  static displayName = '角色维护';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '权限管理', link: '' },
      { text: '角色维护', link: '#/authority/role' },
    ];
    return (
      <div className="operator-list-page">
        {/* <CustomBreadcrumb dataSource={breadcrumb} /> */}
        <IceContainer>
          <RoleList/>
        </IceContainer>
      </div>
    );
  }
}