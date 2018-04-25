

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import StockListTable from './components/StockListTable';

import './StockList.scss';

export default class StockList extends Component {
  static displayName = '库存列表';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '库存管理', link: '' },
      { text: '库存列表', link: '#/stock/list' },
    ];
    return (
      <div className="tag-list-page">
        {/* <CustomBreadcrumb dataSource={breadcrumb} /> */}
        <StockListTable />
      </div>
    );
  }
}
