

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import StorageLocationTable from './components/StorageLocationTable';

import './TagList.scss';

export default class StorageLocationList extends Component {
  static displayName = '库位列表';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '系统管理', link: '' },
      { text: '库位列表', link: '#/sys/StorageLocation' },
    ];
    return (
      <div className="tag-list-page">
        {/* <CustomBreadcrumb dataSource={breadcrumb} /> */}
        <StorageLocationTable />
      </div>
    );
  }
}
