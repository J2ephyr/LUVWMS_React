import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, Select } from '@icedesign/base';
import { put } from '../../../../../utils/Luv'
const FormItem = Form.Item;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

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
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      put('/sys/dictionary',values).then(response=>{
        if(response.data.status != 'success'){
          alert(response.data.message);
          return ;
        }
      });
      const { dataIndex } = this.state;
      this.props.getFormValues(dataIndex, values);
      this.setState({
        visible: false,
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
    const { index, record, btn } = this.props;
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
          {btn}
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="编辑"
        >
          <Form direction="ver" field={this.field}>
            <FormItem label="编号：" {...formItemLayout}>
              <Input
                {...init('rid', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
            <FormItem label="参数值：" {...formItemLayout}>
              <Input
                {...init('paraId', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
            <FormItem label="参数名称：" {...formItemLayout}>
              <Input
                {...init('text', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
            <FormItem label="备注：" {...formItemLayout}>
              <Input
                {...init('remark', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
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
