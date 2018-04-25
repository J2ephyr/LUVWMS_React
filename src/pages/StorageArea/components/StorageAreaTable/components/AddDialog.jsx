import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, Select } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {post} from '../../../../../utils/Luv';
const FormItem = Form.Item;

export default class AddDialog extends Component {
  static displayName = 'AddDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if(errors != null){
        return ;
      }
      post('/sys/storageArea',values).then(response =>{
        if(response.data.status != 'success'){
          alert(response.data.message);
          return ;
        }
        this.setState({
          visible:false,
        })
        this.props.addFormValues(values);
      });
      console.log('errors', errors, 'values', values);
    }); 
  };

  onOpen = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
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
          onClick={() => this.onOpen()}
        >
          新增
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.validateAllFormField}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="新增"
        >
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
          <Form direction="ver" field={this.field}>

          <FormItem label="库区编号：" {...formItemLayout}>
            <IceFormBinder name="areaNo" required max={10} message="必填">
              <Input/>
            </IceFormBinder>
            <IceFormError name="areaNo" />
            </FormItem>

            <FormItem label="库区名称：" {...formItemLayout}>
            <IceFormBinder name="areaName" required max={10} message="必填">
              <Input/>
            </IceFormBinder>
            <IceFormError name="areaName" />
            </FormItem>

            <FormItem label="是否有效：" {...formItemLayout}>
             <IceFormBinder name="isValid" required max={10} message="必填">
              <Select>
              <Option value="1">是</Option>
              <Option value="0">否</Option>
              </Select>
              </IceFormBinder>
              <IceFormError name="isValid" />
            </FormItem>
          </Form>
          </IceFormBinderWrapper>
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
