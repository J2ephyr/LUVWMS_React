

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import StorageAreaTable from './components/StorageAreaTable';

import './TagList.scss';

export default class StorageAreaList extends Component {
  static displayName = '库区列表';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '系统管理', link: '' },
      { text: '库区列表', link: '#/sys/StorageArea' },
    ];
    return (
      <div className="tag-list-page">
        {/* <CustomBreadcrumb dataSource={breadcrumb} /> */}
        <StorageAreaTable />
      </div>
    );
  }
}
