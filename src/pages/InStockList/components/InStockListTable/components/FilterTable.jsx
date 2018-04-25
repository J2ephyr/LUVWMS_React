import React, { Component } from 'react';
import { Input, Grid, Select, Button, DatePicker, Icon } from '@icedesign/base';
import { Upload } from '@icedesign/base';
import WebConstant from '../../../../../config/WebConstant';
import {post,syncGet} from '../../../../../utils/Luv';
// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { Option } = Select;

export default class FilterTable extends Component {
  static displayName = 'FilterTable';
  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
    };
  }
  fetchData = (pid) =>{
    let url = '/common/selectDS?pid='+pid;
    let response = syncGet(url);
    if(response == undefined ||response.status != 'success'){
      return ;
  }
 
        this.setState({
            dataSource:response.data,
        });

  };
  componentDidMount() {
    this.fetchData(10002);
  }
  onChange=(info)=>{
    console.info("change handle"+info);
  };
  onSuccess=(res)=>{
    alert(res.data.message);
  };
  render() {
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <div>
          <Row wrap>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>入库单号</label>
              <IceFormBinder>
                <Input name="inStockNo" />
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>状态</label>
              <IceFormBinder>
                <Select
                 name="inStockStatus"
                 dataSource={this.state.dataSource}
                />
              </IceFormBinder>
            </Col>
            <div
            style={{
              textAlign: 'left',
            }}
          >
            <Button onClick={this.props.onReset} type="normal">
              重置
            </Button>
            <Button
              onClick={this.props.onSubmit}
              type="primary"
              style={{ marginLeft: '10px' }}
            >
              查询
            </Button>
          </div>
          </Row>
          <div style={{marginLeft:'25px'}}>
          <Upload
            action={WebConstant.BASE_URL+"/inStock"}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            limit={1}
            onChange={this.onChange}
            onSuccess={this.Onsuccess}
          >
          <Button type="light" shape="ghost">
            <Icon type="share" />
            导入入库单
          </Button>
          </Upload>
          </div>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  filterCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },

  filterTitle: {
    width: '68px',
    textAlign: 'right',
    marginRight: '12px',
    fontSize: '14px',
  },

  filterTool: {
    width: '200px',
  },
};
