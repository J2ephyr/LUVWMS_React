

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import GoodsForm from './components/GoodsForm';

import './BasicSetting.scss';

export default class CreateGoods extends Component {
  static displayName = '新增商品';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '商品管理', link: '' },
      { text: '新增商品', link: '#/goods/create' },
    ];
    return (
      <div className="basic-setting-page">
        {/* <CustomBreadcrumb dataSource={breadcrumb} /> */}
        <GoodsForm />
      </div>
    );
  }
}
