/* eslint react/jsx-no-bind: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Button, Feedback, Icon } from '@icedesign/base';
import CellEditor from './CellEditor';
import AddItem from '../AddItem'
import './EditableTable.scss';
import { get, del } from '../../../../utils/Luv';

const url = '/setting/navigation';
const Toast = Feedback.toast;
export default class EditableTable extends Component {
  static displayName = 'EditableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[]
    };
  }
  componentDidMount = () =>{
    get(url).then(response => {
      if(response.data.status == 'success'){
        this.setState({
          dataSource:response.data.data,
        });
      }
    });
  }
  renderOrder = (value, index) => {
    return <span>{index + 1}</span>;
  };

  deleteItem = (index) => {
    let rid = this.state.dataSource[index].id;
    this.state.dataSource.splice(index, 1);
    del(url+"/"+rid).then(response => {
      if(response.data.status == 'success'){
        Toast.success(response.data.message);
      }
    });
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  renderOperation = (value, index) => {
    return (
      <Button onClick={this.deleteItem.bind(this, index)} shape="text">
        删除
      </Button>
    );
  };

  changeDataSource = (index, valueKey, value) => {
    // text 将修改后的表格数据发送接口，持久化
    this.state.dataSource[index][valueKey] = value;
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  renderEditor = (valueKey, value, index, record) => {
    return (
      <CellEditor
        valueKey={valueKey}
        index={index}
        value={record[valueKey]}
        onChange={this.changeDataSource}
      />
    );
  };

  addMoreItem = () => {
    return (
      <AddItem
      visible = {true}
      />
    );
  };

  render() {
    return (
      <div className="editable-table">
          <IceContainer style={styles.IceContainer}>
          <div>
            <Button
              onClick={this.addMoreItem}
              size="small"
              style={styles.batchBtn}
            >
              <Icon type="add" />增加
            </Button>
            </div>
          </IceContainer>
        <IceContainer>
          <Table dataSource={this.state.dataSource} hasBorder={false}>
            <Table.Column width={80} title="ID" cell={this.renderOrder} />
            <Table.Column
              width={280}
              title="菜单文本"
              cell={this.renderEditor.bind(this, 'permissionDesc')}
            />
            <Table.Column
              width={240}
              title="菜单地址"
              cell={this.renderEditor.bind(this, 'permissionUrl')}
            />
            <Table.Column
              width={180}
              title="菜单属性"
              cell={this.renderEditor.bind(this, 'permissioName')}
            />
            <Table.Column title="操作" cell={this.renderOperation} />
          </Table>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  addNewItem: {
    background: '#F5F5F5',
    height: 32,
    lineHeight: '32px',
    marginTop: 20,
    cursor: 'pointer',
    textAlign: 'center',
  },
  batchBtn: {
    marginRight: '10px',
  },
};
