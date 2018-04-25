

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import OrdersListTable from './components/OrdersListTable';

import './OrdersList.scss';

export default class OrdersList extends Component {
  static displayName = '订单管理';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '出库管理', link: '' },
      { text: '订单管理', link: '#/outStock/order' },
    ];
    return (
      <div className="tag-list-page">
        {/* <CustomBreadcrumb dataSource={breadcrumb} /> */}
        <OrdersListTable />
      </div>
    );
  }
}
