import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import OperatorList from './components/OperatorList/OperatorList'
import './Operator.scss';
import IceContainer from '@icedesign/container';

export default class Operator extends Component {
  static displayName = '人员维护';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '权限管理', link: '' },
      { text: '人员维护', link: '#/stock/list' },
    ];
    return (
      <div className="operator-list-page">
        {/* <CustomBreadcrumb dataSource={breadcrumb} /> */}
        <IceContainer>
          <OperatorList/>
        </IceContainer>
      </div>
    );
  }
}