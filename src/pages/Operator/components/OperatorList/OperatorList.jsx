import React, { Component } from 'react';
import { Table, Button, Icon, Pagination, Moment, Tag  } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import { get, del } from '../../../../utils/Luv';
import ComboBox from '../../../../components/ComboBox';

const MOCKDATA=[
  {
    "no":"admin",
    "name":"系统管理员",
    "address":"浙江省杭州市新加坡科技园",
    "phone":"18188888888",
    "sex":"男",
    "flag":"true",
    "oprtTime":"2018-02-3 12:12:12",
  },
  {
    "no":"1",
    "name":"小宝",
    "address":"浙江省杭州市新加坡科技园",
    "phone":"18188888887",
    "sex":"男",
    "flag":"false",
  }
];
const ROLEMOCKDATA=[
  {
    roleNo:"1",
    roleName:"管理员",
  },
  {
    roleNo:"2",
    roleName:"用户"
  },
]
export default class OperatorList extends Component {
  static displayName = 'OperatorList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      currentPage:1,
      pageSize:5,
      total:0,
      dataSource: [],
      roleData:ROLEMOCKDATA,
    };
  }



  deleteItem = (record) => {
    const { id } = record;
    console.log('delete item', id);
  };
  handleRemove = (value, index) => {
    const { dataSource } = this.state;
    let id = dataSource[index].id;
    del('/authority/operator/'+id).then(response=>{
      if(response.data.status != 'success'){
        alert(response.data.message);
        return ;
      }
    })
    dataSource.splice(index, index + 1);
    this.setState({
      dataSource,
    });
  };
  getFormValues = (dataIndex, values) => {
    const { dataSource } = this.state;
    dataSource[dataIndex] = values;
    this.setState({
      dataSource,
    });
  };
  renderRoleTag = (value, index, record)=>{
    // return (
    //   <Tag shape="readonly">管理员</Tag>
    // )
    //人员拥有的角色
    const { roleList } = record;
    //所有角色
    const { roleData } = this.state;
    return roleData.map(role=>{
      return (
        <span>
          {
      roleList.map(UserRoleNo=>{
        if(role.roleNo == UserRoleNo){
          return (          
            <Tag shape="readonly">{role.roleName}</Tag>
          );
        }
      })}
      </span>
    );
    });
  }
  renderOperator = (value, index, record) => {
    const { roleData } = this.state;
    return (
      <span>
        <EditDialog
          index={index}
          record={record}
          btn="编辑"
          roleData={roleData}
          getFormValues={this.getFormValues}
        />
        <DeleteBalloon
          handleRemove={() => this.handleRemove(value, index, record)}
        />
      </span>
    );
  };
  changePage = (currentPage) =>{
    this.setState({
      currentPage,
    })
    let start = (currentPage-1)*this.state.pageSize;
    this.fetchData(start);
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = (start) => {
    let filterFormValue = this.state.filterFormValue;
    if(start == undefined){
      start = (this.state.currentPage-1)*this.state.pageSize;
    }
    let url = '/authority/operator?start='+start+'&limit='+this.state.pageSize;
    get(url,filterFormValue).then(response => {
      if(response == false){
        return ;
      }
      if(response.data.status == 'success'){
        this.setState({
          dataSource:response.data.data,
          total:response.data.total,
        });
      }
    });
  }
  render() {
    const { roleData } = this.state;
    return (
      <div className="selectable-table" style={styles.selectableTable}>
        <IceContainer style={styles.IceContainer}>
          <div>
            <EditDialog
              index=""
              record=""
              btn="新增"
              roleData={roleData}
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
            <Table.Column title="账号" dataIndex="no" width={120} lock="left" align="center"/>
            <Table.Column title="名称" dataIndex="name" width={120} align="center"/>
            <Table.Column title="地址" dataIndex="address" width={280} align="center"/>
            <Table.Column title="联系电话" dataIndex="phone" width={130} align="center"/>
            <Table.Column title="角色" dataInder="roleList" width={120} align="center"
             cell={this.renderRoleTag}
            />
            <Table.Column title="性别" dataIndex="sex" width={120}  align="center"
              cell={ (value, index, record)=>{
                return (
                  <ComboBox 
                    pid={10006}
                    value={record.sex}
                  />
                )
              }}
            />
            <Table.Column title="状态" dataIndex="flag" width={120}  align="center"
              cell={ (value, index, record)=>{
                return (
                  <ComboBox 
                    pid={10007}
                    value={record.flag}
                  />
                )
              }}
            />
            <Table.Column title="创建人账号" dataIndex="oprtNo" width={120} align="center"/>
            <Table.Column title="创建时间" dataIndex="oprtTime" width={160} align="center"
              cell={(value, index, record)=>{return Moment(record.gmtCreate).format('YYYY-MM-DD HH:mm:ss');}}
            />
            <Table.Column
              title="操作"
              cell={this.renderOperator}
              lock="right"
              align="center"
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