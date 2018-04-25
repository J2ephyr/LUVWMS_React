import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, Select } from '@icedesign/base';
import OrderDetail from './OrderDetail';
const FormItem = Form.Item;

export default class OrderDialog extends Component {
  static displayName = 'OrderDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
    };
  };
  onOpen = (index, record) => {
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
          style={{ width: 1050}}
          visible={this.state.visible}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          footer = {false}
          title="订单详情"
        >
          <OrderDetail
          record={record}
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
