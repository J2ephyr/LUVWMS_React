import React, { Component } from 'react';
import { Table, Button, Icon, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
const MOCKDATA=[
  {
    "roleNo":"admin",
    "roleName":"系统管理员",
  },
  {
    "roleNo":"1",
    "roleName":"小宝",
  }
];
export default class RoleList extends Component {
  static displayName = 'RoleList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      currentPage:1,
      pageSize:5,
      total:0,
      dataSource: MOCKDATA,
    };
  }



  deleteItem = (record) => {
    const { id } = record;
    console.log('delete item', id);
  };

  renderOperator = (value, index, record) => {
    return (
      <span>
        <EditDialog
          index={index}
          record={record}
          btn="编辑"
          getFormValues={this.getFormValues}
        />
        <DeleteBalloon
          handleRemove={() => this.handleRemove(value, index, record)}
        />
      </span>
    );
  };

  render() {
    return (
      <div className="selectable-table" style={styles.selectableTable}>
        <IceContainer style={styles.IceContainer}>
          <div>
            <EditDialog
              index=""
              record=""
              btn="新增"
              getFormValues={this.getFormValues}
            />
          </div>
          <div>
            <a href="/" download>
              <Icon size="small" type="download" /> 导出表格数据到 .csv 文件
            </a>
          </div>
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={this.state.dataSource}
            isLoading={this.state.isLoading}
          >
            <Table.Column title="编号" dataIndex="roleNo" width={160}/>
            <Table.Column title="名称" dataIndex="roleName" width={120} />
            <Table.Column
              title="操作"
              cell={this.renderOperator}
              width={160}
            />
          </Table>
          <div style={styles.pagination}>
            <Pagination
              current={this.state.current}
              pageSize={this.state.pageSize}
              total={this.state.total}
              onChange={this.changePage}
             />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  batchBtn: {
    marginRight: '10px',
  },
  IceContainer: {
    minHeight: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
  },
  removeBtn: {
    marginLeft: 10,
  },
  pagination: {
    textAlign: 'left',
    paddingTop: '26px',
  },
};