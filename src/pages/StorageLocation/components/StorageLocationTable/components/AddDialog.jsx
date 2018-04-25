import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, Select } from '@icedesign/base';
import {post} from '../../../../../utils/Luv';
const FormItem = Form.Item;

export default class AddDialog extends Component {
  static displayName = 'AddDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
    };
    this.field = new Field(this);
  }

  handleSubmit = () => {
    this.field.validate((errors, values) => {
      if(errors != null){
        return ;
      }
      post('/sys/storageLocation',values).then(response =>{
        if(response.data.status != 'success'){
          alert(response.data.message);
          return ;
        }
        this.setState({
          visible:false,
        })
        this.props.addFormValues(values);
      });
    });
  };

  onOpen = (index, record) => {
    this.field.setValues({ ...record });
    this.setState({
      visible: true,
      dataIndex: index,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const init = this.field.init;
    const { index, record } = this.props;
    const formItemLayout = {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    return (
      <div style={styles.editDialog}>
        <Button
          size="small"
          type="primary"
          onClick={() => this.onOpen(index, record)}
        >
          批量新增
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="批量新增"
        >
          <Form direction="ver" field={this.field}>
            <FormItem label="库区名称：" {...formItemLayout}>
              <Input
                {...init('areaName', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
            <FormItem label="库位开始编码：" {...formItemLayout}>
              <Input
                {...init('storageLocationNoS', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
            <FormItem label="库位结束编码：" {...formItemLayout}>
              <Input
                {...init('storageLocationNoE', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
            <FormItem label="库位类型：" {...formItemLayout}>
              <Select
                {...init('storageLocationType', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              >
              <Option value="1">散单库位</Option>
              <Option value="0">批量库位</Option>
              </Select>
            </FormItem>
          </Form>
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
