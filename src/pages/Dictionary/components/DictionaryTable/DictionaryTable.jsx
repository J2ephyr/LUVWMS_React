import React, { Component } from 'react';
import { Table, Button, Icon, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import EditDialog from './components/EditDialog';
import DictionaryPanel from '../DictionaryPanel';
import DeleteBalloon from './components/DeleteBalloon';
import { get, del } from '../../../../utils/Luv';

const MOCKDATA=[

];
export default class DictionaryTable extends Component {
  static displayName = 'DictionaryTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      currentPage:1,
      pageSize:5,
      total:0,
      isLoading:false,
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

  fetchData = ({key}) => {
    let url = '/sys/dictionary?pid='+key;
    get(url).then(response => {
      if(response == false){
        return ;
      }
      if(response.data.status == 'success'){
        this.setState({
          dataSource:response.data.data,
          isLoading:false
        });
      }
    });
  }

  onClick = (key) => {
    this.setState({
      isLoading:true
    })
    this.fetchData(key);
  }

  render() {
    return (
      <IceContainer>
        <DictionaryPanel
          onClick={this.onClick}
        />
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
            <Table.Column title="编号" dataIndex="rid" width={120}/>
            <Table.Column title="参数值" dataIndex="paraId" width={120}/>
            <Table.Column title="参数名称" dataIndex="text" width={120}/>
            <Table.Column title="备注" dataIndex="remark" width={120}/>
            <Table.Column title="创建时间" dataIndex="gmtCreate" width={120}/>
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
      </IceContainer>
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