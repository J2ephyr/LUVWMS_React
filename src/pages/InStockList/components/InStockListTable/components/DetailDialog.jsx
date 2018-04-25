import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, Select } from '@icedesign/base';
import CustomTable from './CustomTable';
import Ellipsis from '@icedesign/ellipsis';
import { get } from '../../../../../utils/Luv';

const FormItem = Form.Item;

const MOCK_DATA = [
  {
    pn: '23452341234123',
    gName: '专业一点的商品名称',
    gModel: '非常专业',
    gUnit:'个',
    gQty:'200',
    gPrice:'200',
    storageLocationNo:'A-01-01-02',
  },
  {
    pn: '23452341234123',
    gName: '专业一点的商品名称',
    gModel: '非常专业',
    gUnit:'个',
    gQty:'200',
    gPrice:'200',
    storageLocationNo:'A-01-01-02',
  },
  {
    pn: '23452341234123',
    gName: '专业一点的商品名称',
    gModel: '非常专业',
    gUnit:'个',
    gQty:'200',
    gPrice:'200',
    storageLocationNo:'A-01-01-02',
  },
  {
    pn: '23452341234123',
    gName: '专业一点的商品名称',
    gModel: '非常专业',
    gUnit:'个',
    gQty:'200',
    gPrice:'200',
    storageLocationNo:'A-01-01-02',
  },
];
export default class DetailDialog extends Component {
  static displayName = 'DetailDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      currentPage:1,
      pageSize:5,
      total:0,
      dataSource: [],
      visible: false,
      record: null,
    };

    this.columns = [
      {
        title: '条形码',
        dataIndex: 'pn',
        key: 'pn',
      },
      {
        title: '商品名称',
        dataIndex: 'gName',
        key: 'gName',
        render: (value, index, record)=>{
          return (
              <Ellipsis lineLimit={1} text={record.gName}/>           
          );
        },
      },
      {
        title: '规格',
        dataIndex: 'gModel',
        key: 'gModel',
      },
      {
        title: '计量单位',
        dataIndex: 'gUnit',
        key: 'gUnit',
      },
      {
        title: '数量',
        dataIndex: 'gQty',
        key: 'gQty',
      },
      {
        title: '单价',
        dataIndex: 'gPrice',
        key: 'gPrice',
      },
      {
        title: '库位',
        dataIndex: 'storageLocationNo',
        key: 'storageLocationNo',
      },
    ]
  }

  onOpen = (index, record) => {
    this.setState({
      visible: true,
      record: record,
    });
    this.fetchData(undefined, record.id);
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  changePage = (currentPage) =>{
    this.setState({
      currentPage,
    })
    let start = (currentPage-1)*this.state.pageSize;
    this.fetchData(start);
  };
  fetchData = (start,id) => {
    if(start == undefined){
      start = (this.state.currentPage-1)*this.state.pageSize;
    }
    if(id == undefined){
      id = this.state.record.id;
    }
    let url = '/inStock/list/'+id+'?start='+start+'&limit='+this.state.pageSize;
    get(url).then(response => {
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
    const { index, record } = this.props;

    return (
      <div style={styles.editDialog}>
        <Button
          size="small"
          type="primary"
          onClick={() => this.onOpen(index, record)}
        >
          详情
        </Button>
        <Dialog
          style={{ width: 1050 }}
          visible={this.state.visible}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          footer = {false}
          title="入库单详情"
        >  
          <CustomTable
            dataSource={this.state.dataSource}
            columns={this.columns}
            hasBorder={false}
            current={this.state.currentPage}
            pageSize={this.state.pageSize}
            total={this.state.total}
            changePage={this.changePage}
          />
        </Dialog>
      </div>
    );
  }
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  },
};
