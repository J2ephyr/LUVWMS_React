import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, Select,Moment } from '@icedesign/base';
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
        title: '库位',
        dataIndex: 'storageLocationNo',
        key: 'storageLocationNo',
      },
      {
        title: '库区',
        dataIndex: 'areaNo',
        key: 'areaNo',
      },
      {
        title: '数量',
        dataIndex: 'gQty',
        key: 'gQty',
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
    let url = '/stock/'+id+'?start='+start+'&limit='+this.state.pageSize;
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
          title="库存详情"
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
