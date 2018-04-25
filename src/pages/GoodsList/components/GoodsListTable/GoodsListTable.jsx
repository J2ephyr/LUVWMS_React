import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import FilterTable from './components/FilterTable';
import Img from '@icedesign/img';
import DeleteBalloon from './components/DeleteBalloon';
import {get, del} from '../../../../utils/Luv'
const MOCK_DATA = [
  {
    goodsImg: 'https://img.alicdn.com/bao/uploaded/i3/120976213/TB2O4nSnblmpuFjSZFlXXbdQXXa_!!120976213.jpg_240x240.jpg',
    goodsName: '于momo2017秋冬新款背带裙复古格子连衣裙清新背心裙a字裙短裙子',
    pn: '918983245',
    goodsModel:'x xl xxl',
    goodsColor:'黄色',
  },
  {
    goodsImg: 'https://img.alicdn.com/bao/uploaded/i4/TB1GiPSinJ_SKJjSZPiYXH3LpXa_M2.SS2_100x100.jpg',
    goodsName: 'SOTHEA 2017秋冬新款 高质感特定纱线欧美宽松马海毛羊毛毛衣',
    pn: '918983231',
    goodsModel:'x xl xxl',
    goodsColor:'黄色',
  },
  {
    goodsImg: 'https://img.alicdn.com/bao/uploaded/i3/120976213/TB2O4nSnblmpuFjSZFlXXbdQXXa_!!120976213.jpg_240x240.jpg',
    goodsName: '川岛屋 日式天然玉米皮草编碗垫锅垫隔热垫茶垫加厚餐垫GD-29',
    pn: '918983223',
    goodsModel:'x xl xxl',
    goodsColor:'黄色',
  },
  {
    goodsImg: 'https://img.alicdn.com/bao/uploaded/i3/120976213/TB2bxHGtpXXXXXVXXXXXXXXXXXX_!!120976213.jpg_240x240.jpg',
    goodsName: '日式和风深蓝素色文艺餐巾餐垫围裙锅垫隔热手套厨房桌布GD-11',
    pn: '918983123',
    goodsModel:'x xl xxl',
    goodsColor:'黄色',
  },
];
export default class GoodsListTable extends Component {
  static displayName = 'GoodsListTable';

  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {
    this.fetchData();
  }
  fetchData = (start) => {
    let filterFormValue = this.state.filterFormValue;
    if(start == undefined){
      start = (this.state.currentPage-1)*this.state.pageSize;
    }
    let url = '/goods/list?start='+start+'&limit='+this.state.pageSize;
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
  constructor(props) {
    super(props);
    this.queryCache = {};
    this.state = {
      currentPage:1,
      pageSize:5,
      total:0,
      dataSource: [],
      filterFormValue:{},
    };
    this.columns = [
      {
        title: '',
        dataIndex: 'goodsImg',
        key: 'goodsImg',
        render:(value, index, record) => {
          return (
            <Img
            width={200}
            height={100}
            src={record.goodsImg}
            type='cover'
            />
          );
        }
      },
      {
        title: '商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName',
      },
      {
        title: '条形码',
        dataIndex: 'pn',
        key: 'pn',
      },
      {
        title: '规格',
        dataIndex: 'goodsModel',
        key: 'goodsModel',
      },
      {
        title: '颜色',
        dataIndex: 'goodsColor',
        key: 'goodsColor',
      },
      {
        title: '操作',
        key: 'action',
        render: (value, index, record) => {
          return (
            <span>
              <EditDialog
                index={index}
                record={record}
                getFormValues={this.getFormValues}
              />
              <DeleteBalloon
                handleRemove={() => this.handleRemove(value, index, record)}
              />
            </span>
          );
        },
      },
    ];
  }

  getFormValues = (dataIndex, values) => {
    const { dataSource } = this.state;
    dataSource[dataIndex] = values;
    this.setState({
      dataSource,
    });
  };

  handleRemove = (value, index) => {
    const { dataSource } = this.state;
    let id = dataSource[index].id;
    del('/goods/list/'+id).then(response=>{
      if(response == false){
        return ;
      }
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
  filterFormChange = (value) => {
    this.setState({
      filterFormValue: value,
    });
  };
  filterTable = () => {
    // 合并参数，请求数据
    this.queryCache = {
      ...this.queryCache,
      ...this.state.filterFormValue,
    };
    this.fetchData();
  };
  resetFilter = () => {
    this.setState({
      filterFormValue: {},
    });
  };
  changePage = (currentPage) =>{
    this.setState({
      currentPage,
    })
    let start = (currentPage-1)*this.state.pageSize;
    this.fetchData(start);
  };
  render() {
    const { filterFormValue } = this.state;
    return (
      <div className="tab-table">
        <IceContainer>
          <FilterTable
            value={filterFormValue}
            onChange={this.filterFormChange}
            onSubmit={this.filterTable}
            onReset={this.resetFilter}
          />
          <CustomTable
            dataSource={this.state.dataSource}
            columns={this.columns}
            hasBorder={false}
            current={this.state.currentPage}
            pageSize={this.state.pageSize}
            total={this.state.total}
            changePage={this.changePage}
          />
        </IceContainer>
      </div>
    );
  }
}
