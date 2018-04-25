import React, { Component } from 'react';
import { Input, Grid, Select, Button, DatePicker, Icon } from '@icedesign/base';
import { Upload } from '@icedesign/base';
import WebConstant from '../../../../../config/WebConstant';
// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { Option } = Select;

export default class FilterTable extends Component {
  static displayName = 'FilterTable';

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
              <label style={styles.filterTitle}>商品名称</label>
              <IceFormBinder>
                <Input name="goodsName" />
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>PN</label>
              <IceFormBinder>
              <Input name="pn" />
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
