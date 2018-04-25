import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, Select } from '@icedesign/base';

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
          编辑
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
            <FormItem label="库位名称" {...formItemLayout}>
              <Input
                {...init('storageLocationName', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="库位类型:" {...formItemLayout}>
              <Input
                {...init('storageLocationType', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              >
              <Option value="1">散单库位</Option>
              <Option value="0">批量库位</Option>
              </Input>
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
