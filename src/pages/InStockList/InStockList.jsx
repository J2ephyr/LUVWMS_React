

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import InStockListTable from './components/InStockListTable';

import './InStockList.scss';

export default class InStockList extends Component {
  static displayName = '入库单列表';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '入库管理', link: '' },
      { text: '入库单列表', link: '#/inStock/list' },
    ];
    return (
      <div className="tag-list-page">
        {/* <CustomBreadcrumb dataSource={breadcrumb} /> */}
        <InStockListTable />
      </div>
    );
  }
}
