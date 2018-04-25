import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import AddDialog from './components/AddDialog';
import DeleteBalloon from './components/DeleteBalloon';
import {get, del} from '../../../../utils/Luv'
import { Moment } from '@icedesign/base';

const MOCK_DATA = [
  {
    areaNo: 'A',
    areaName: 'A区',
    isValid: '否',
    gmtCreate:'2018-03-04 18:12:12',
  },
  {
    areaNo: 'B',
    areaName: 'B区',
    isValid: '是',
    gmtCreate:'2018-03-04 18:12:12',
  },
  {
    areaNo: 'C',
    areaName: '补货区',
    isValid: '是',
    gmtCreate:'2018-03-04 18:12:12',
  },
  {
    areaNo: 'D',
    areaName: '拣选区',
    isValid: '是',
    gmtCreate:'2018-03-04 18:12:12',
  },
];

export default class StorageAreaTable extends Component {
  static displayName = 'StorageAreaTable';

  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {
    this.fetchData(0,this.state.pageSize);
  }
  fetchData = (start,limit) => {
    let url = '/sys/storageArea?start='+start+'&limit='+limit;
    get(url).then(response => {
      if(response.data.status == 'success'){
        this.setState({
          dataSource:response.data.data,
          total:response.data.total,
        });
      }
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      currentPage:1,
      pageSize:5,
      total:0,
      dataSource: [],
    };
    this.columns = [
      {
        title: '库区编号',
        dataIndex: 'areaNo',
        key: 'areaNo',
      },
      {
        title: '库区名称',
        dataIndex: 'areaName',
        key: 'areaName',
      },
      {
        title: '是否有效',
        dataIndex: 'isValid',
        key: 'isValid',
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
              <EditDialog
                index={index}
                record={record}
                getFormValues={this.getFormValues}
              />
              <DeleteBalloon
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
  addFormValues = (value) => {
    const { dataSource } = this.state;
    dataSource.unshift(value);
    dataSource.pop();
    this.setState({
      dataSource,
    })
  };

  handleRemove = (value, index) => {
    const { dataSource } = this.state;
    let id = dataSource[index].id;
    del('/sys/storageArea/'+id).then(response=>{
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
  changePage = (currentPage) =>{
    let start = (currentPage-1)*this.state.pageSize;
    this.fetchData(start,this.state.pageSize);
    this.setState({
      currentPage,
    })
  }
  render() {
    return (
      <div className="tab-table">
      <IceContainer>
            <span>
              <AddDialog
                addFormValues={this.addFormValues}
              />
            </span>
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
