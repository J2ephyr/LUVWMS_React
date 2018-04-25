import React, { Component } from 'react';
import { Input, Grid, Select, Button, DatePicker, Icon } from '@icedesign/base';

// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { Option } = Select;

export default class FilterTable extends Component {
  static displayName = 'FilterTable';

  render() {
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <div>
          <Row wrap>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>订单号</label>
              <IceFormBinder>
                <Input name="orderNo" />
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>状态</label>
              <IceFormBinder>
                <Select name="inStockStatus">
                  <Option value="10">新建</Option>
                  <Option value="11">已到货</Option>
                  <Option value="12">已理货</Option>
                  <Option value="13">已上架</Option>
                  <Option value="14">入库完成</Option>
                  <Option value="18">已关闭</Option>
                </Select>
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
          <Row>
          <div style={{marginLeft:'25px'}}>
            <Button onClick={this.props.importInStock} type="light" shape="ghost">
              <Icon type="share" />
              导入订单
            </Button>
          </div>
          <div style={{marginLeft:'25px'}}>
            <Button onClick={this.props.importInStock} type="light" shape="ghost">
            <Icon type="attachment" />
             确认订单
            </Button>
          </div>
          </Row>
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
