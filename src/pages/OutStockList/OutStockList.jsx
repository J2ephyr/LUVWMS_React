

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import OutStockListTable from './components/OutStockListTable';

import './OutStockList.scss';

export default class OutStockList extends Component {
  static displayName = '出库单列表';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '出库管理', link: '' },
      { text: '出库单列表', link: '#/outStock/list' },
    ];
    return (
      <div className="tag-list-page">
        {/* <CustomBreadcrumb dataSource={breadcrumb} /> */}
        <OutStockListTable />
      </div>
    );
  }
}
