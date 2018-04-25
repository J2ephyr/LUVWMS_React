import React, { Component } from 'react';
import { Switch, Dialog, Button, Form, Input, Field, Select, Checkbox } from '@icedesign/base';
import { put } from '../../../../../utils/Luv';
import  TagGroup  from './TagGroup';
const { Group: CheckboxGroup } = Checkbox;
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
      put('/authority/operator',values).then(response=>{
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
    const { index, record, btn,roleData } = this.props;
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
          title={btn}
        >
          <Form direction="ver" field={this.field}>
            <FormItem label="账号：" {...formItemLayout}>
              <Input
                {...init('no', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="名称：" {...formItemLayout}>
              <Input
                {...init('name', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
            <FormItem label="地址：" {...formItemLayout}>
              <Input
                {...init('address', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
            <FormItem label="联系电话：" {...formItemLayout}>
              <Input
                {...init('phone', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
            <FormItem label="性别：" {...formItemLayout}>
              <Input
                {...init('sex', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
            <FormItem label="状态：" {...formItemLayout}>
              <Switch
                {...init('flag', {valueName:'checked'},{
                  rules: [{ required: true, message: '必填选项' }],
                })}
               />
            </FormItem>
            <FormItem label="角色：" {...formItemLayout}>
              <TagGroup
                {...init('roleNo', {valueName:'defaultValue'},{
                  rules: [{ required: true, message: '必填选项' }],
                })}
                roleData={roleData}
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
