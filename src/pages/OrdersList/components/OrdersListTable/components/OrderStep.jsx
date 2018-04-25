import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Step, Button, Dialog, Balloon } from '@icedesign/base';

const { Item: StepItem } = Step;
const { Group: ButtonGroup } = Button;

export default class OrderStep extends Component {
  static displayName = 'OrderStep';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex:null,
      currentStep: 3,
    };
  }

  next = () => {
    const s = this.state.currentStep + 1;

    this.setState({
      currentStep: s > 6 ? 6 : s,
    });
  };

  prev = () => {
    const s = this.state.currentStep - 1;

    this.setState({
      currentStep: s < 0 ? 0 : s,
    });
  };

  onClick = (currentStep) => {

  };


  render() {
    const { currentStep } = this.state;
    const { index, record } = this.props;
    return (
     <div style={styles.OrderStep}>
                <Step current={currentStep}>
                <StepItem title="订单初始化" onClick={this.onClick} />
                <StepItem title="订单确认" onClick={this.onClick} />
                <StepItem title="拣货完成" onClick={this.onClick} />
                <StepItem title="已发货" onClick={this.onClick} />
                <StepItem title="已收货" onClick={this.onClick} />
                </Step>
      </div>
    );
  }
}

const styles = {
  OrderStep: {
    marginTop: '15px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    margin: '40px 0 20px',
  },
};
