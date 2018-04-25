

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import GoodsListTable from './components/GoodsListTable';

import './TagList.scss';

export default class GoodsList extends Component {
  static displayName = '商品列表';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '商品管理', link: '' },
      { text: '商品列表', link: '#/goods/list' },
    ];
    return (
      <div className="tag-list-page">
        {/* <CustomBreadcrumb dataSource={breadcrumb} /> */}
        <GoodsListTable />
      </div>
    );
  }
}
