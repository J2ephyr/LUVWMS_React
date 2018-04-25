import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Step, Button, Dialog, Balloon } from '@icedesign/base';

const { Item: StepItem } = Step;
const { Group: ButtonGroup } = Button;

export default class InStockStep extends Component {
  static displayName = 'InStockStep';

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
    const { currentStep } = this.state;
    const { index, record } = this.props;
    return (
     <div style={styles.editDialog}>
        <Button
          size="small"
          type="primary"
          onClick={() => this.onOpen(index, record)}
        >
          进度
        </Button>
        <Dialog
          style={{ width: 1050 }}
          visible={this.state.visible}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          footer = {false}
          title="入库进度"
        >  
            <IceContainer>
                <Step current={currentStep}>
                <StepItem title="新建" onClick={this.onClick} />
                <StepItem title="到货" onClick={this.onClick} />
                <StepItem title="理货" onClick={this.onClick} />
                <StepItem title="上架" onClick={this.onClick} />
                <StepItem title="完成" onClick={this.onClick} />
                </Step>
            </IceContainer>
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
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    margin: '40px 0 20px',
  },
};
