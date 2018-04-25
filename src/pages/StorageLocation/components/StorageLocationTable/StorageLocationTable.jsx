import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import AddDialog from './components/AddDialog';
import DeleteBalloon from './components/DeleteBalloon';
import { get, del } from '../../../../utils/Luv';
const MOCK_DATA = [
  {
    storageLocationNo: 'A-01-01-02',
    storageLocationName: 'A-01-01-02',
    areaNo: 'A',
    storageLocationType:'散单库位',
    gmtCreate:'2018-03-04 18:12:12',
  },
  {
    storageLocationNo: 'A-01-01-03',
    storageLocationName: 'A-01-01-02',
    areaNo: 'A',
    storageLocationType:'批量库位',
    gmtCreate:'2018-03-04 18:12:12',
  },
  {
    storageLocationNo: 'A-01-01-04',
    storageLocationName: 'A-01-01-02',
    areaNo: 'A',
    storageLocationType:'散单库位',
    gmtCreate:'2018-03-04 18:12:12',
  },
  {
    storageLocationNo: 'A-01-01-05',
    storageLocationName: 'A-01-01-02',
    areaNo: 'A',
    storageLocationType:'散单库位',
    gmtCreate:'2018-03-04 18:12:12',
  },
  
];

export default class StorageLocationTable extends Component {
  static displayName = 'StorageLocationTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      currentPage:1,
      pageSize:5,
      total:0,
      dataSource: [],
      filterFormValue:{},
    };
    this.columns = [
      {
        title: '库位编号',
        dataIndex: 'storageLocationNo',
        key: 'storageLocationNo',
      },
      {
        title: '库位名称',
        dataIndex: 'storageLocationName',
        key: 'storageLocationName',
      },
      {
        title: '区域编号',
        dataIndex: 'areaNo',
        key: 'areaNo',
      },
      {
        title: '库位类型',
        dataIndex: 'storageLocationType',
        key: 'storageLocationType',
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
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
    debugger;
    let id = dataSource[index].id;
    del('/sys/storageLocation/'+id).then(response=>{
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
    let url = '/sys/storageLocation?start='+start+'&limit='+this.state.pageSize;
    get(url,filterFormValue).then(response => {
      if(response.data.status == 'success'){
        this.setState({
          dataSource:response.data.data,
          total:response.data.total,
        });
      }
    });
  }
  render() {
    return (
      <div className="tab-table">
      <IceContainer>
            <span>
              <AddDialog addFormValues={this.addFormValues}/>
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
