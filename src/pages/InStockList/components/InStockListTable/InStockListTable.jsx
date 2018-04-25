import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import DetailDialog from './components/DetailDialog';
import InStockStep from './components/InStockStep';
import FilterTable from './components/FilterTable';
import Img from '@icedesign/img';
import CloseBalloon from './components/CloseBalloon';
import ComboBox from '../../../../components/ComboBox';
import { get, del } from '../../../../utils/Luv';
import { Moment } from '@icedesign/base';
const MOCK_DATA = [
  {
    inStockNo: 'IN123981234790871432',
    inStockStatus: '新建',
    memo: '这是备注',
    gmtCreate:'2018-03-04 12:12:12'
  },
  {
    inStockNo: 'IN123981234790871432',
    inStockStatus: '已到货',
    memo: '这是备注',
    gmtCreate:'2018-03-04 12:12:12'
  },
  {
    inStockNo: 'IN123981234790871432',
    inStockStatus: '已理货',
    memo: '这是备注',
    gmtCreate:'2018-03-04 12:12:12'
  },
  {
    inStockNo: 'IN123981234790871432',
    inStockStatus: '已上架',
    memo: '这是备注',
    gmtCreate:'2018-03-04 12:12:12'
  },
];

export default class InStockListTable extends Component {
  static displayName = 'InStockListTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.queryCache = {};
    this.state = {
      currentPage:1,
      pageSize:5,
      total:0,
      dataSource: [],
      filterFormValue:{},
    };
    this.columns = [
      {
        title: '入库单号',
        dataIndex: 'inStockNo',
        key: 'inStockNo',
      },
      {
        title: '状态',
        dataIndex: 'inStockStatus',
        key: 'inStockStatus',
        render: (value, index, record)=>{
          return (
            <ComboBox 
              pid={10002}
              value={record.inStockStatus}
            />
          )
        }
      },
      {
        title: '备注',
        dataIndex: 'memo',
        key: 'memo',
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
        render: (value, index, record)=>{
          let v=Moment(record.gmtCreate).format('YYYY-MM-DD HH:mm:ss');
          return (v);
         },
      },
      {
        title: '操作',
        key: 'action',
        render: (value, index, record) => {
          return (
            <span>
              <DetailDialog
                index={index}
                record={record}
                getFormValues={this.getFormValues}
              />
              <InStockStep
                index={index}
                record={record}
              />
              <CloseBalloon
                handleRemove={() => this.handleRemove(value, index, record)}
              />
            </span>
          );
        },
      },
    ];
  }

  getFormValues = (dataIndex, values) => {
    const { dataSource } = this.state;
    dataSource[dataIndex] = values;
    this.setState({
      dataSource,
    });
  };

  handleRemove = (value, index) => {
    const { dataSource } = this.state;
    let id = dataSource[index].id;
    del('/inStock/list/'+id).then(response=>{
      if(response == false){
        return ;
      }
      if(response.data.status != 'success'){
        alert(response.data.message);
        return ;
      }
    })
    dataSource.splice(index, index + 1);
    this.setState({
      dataSource,
    });
  };
  filterFormChange = (value) => {
    this.setState({
      filterFormValue: value,
    });
  };
  filterTable = () => {
    // 合并参数，请求数据
    this.queryCache = {
      ...this.queryCache,
      ...this.state.filterFormValue,
    };
    this.fetchData();
  };
  resetFilter = () => {
    this.setState({
      filterFormValue: {},
    });
  };
  changePage = (currentPage) =>{
    this.setState({
      currentPage,
    })
    let start = (currentPage-1)*this.state.pageSize;
    this.fetchData(start);
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = (start) => {
    let filterFormValue = this.state.filterFormValue;
    if(start == undefined){
      start = (this.state.currentPage-1)*this.state.pageSize;
    }
    let url = '/inStock/list?start='+start+'&limit='+this.state.pageSize;
    get(url,filterFormValue).then(response => {
      if(response == false){
        return ;
      }
      if(response.data.status == 'success'){
        this.setState({
          dataSource:response.data.data,
          total:response.data.total,
        });
      }
    });
  }
  render() {
    const { filterFormValue } = this.state;

    return (
      <div className="tab-table">
        <IceContainer>
          <FilterTable
            value={filterFormValue}
            onChange={this.filterFormChange}
            onSubmit={this.filterTable}
            onReset={this.resetFilter}
          />
          <CustomTable
            dataSource={this.state.dataSource}
            columns={this.columns}
            hasBorder={false}
            current={this.state.currentPage}
            pageSize={this.state.pageSize}
            total={this.state.total}
            changePage={this.changePage}
          />
        </IceContainer>
      </div>
    );
  }
}
