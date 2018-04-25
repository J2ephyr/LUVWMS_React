import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field } from '@icedesign/base';

const FormItem = Form.Item;

export default class AddItem extends Component {
  static displayName = 'AddItem';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.state = {
        visible : props.visible,
    }
  }

  handleSubmit = () => {
    this.field.validate((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }

      const { dataIndex } = this.state;
      this.props.getFormValues(dataIndex, values);
      this.setState({
        visible: false,
      });
    });
  };


  render() {
    return (
      <div style={styles.editDialog}>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closable="esc,mask,close"
          title="新增"
        >
          <Form direction="ver" field={this.field}>
            <FormItem label="名称：" {...formItemLayout}>
              <Input
                {...init('name', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="缩写名：" {...formItemLayout}>
              <Input
                {...init('shortName', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="文章数：" {...formItemLayout}>
              <Input
                disabled
                {...init('articleNum', {
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
