import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import DictionaryTable from './components/DictionaryTable/DictionaryTable'
import './Dictionary.scss';
import IceContainer from '@icedesign/container';
export default class Dictionary extends Component {
  static displayName = '数据字典';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '系统管理', link: '' },
      { text: '数据字典', link: '#/stock/list' },
    ];
    return (
      <div className="tag-list-page">
        {/* <CustomBreadcrumb dataSource={breadcrumb} /> */}
        <DictionaryTable/>
        
      </div>
    );
  }
}
