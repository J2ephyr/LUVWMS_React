import SessionUtil from "./utils/SessionUtil";
import { syncGet } from "./utils/Luv";
import { hashHistory } from 'react-router';
// <!-- auto generated navs start -->
const autoGenHeaderNavs = [];

const autoGenAsideNavs = [];

// <!-- auto generated navs end -->

const customHeaderNavs = [
  {
    text: '首页',
    to: '/',
    icon: 'home',
  },
  {
    text: '反馈',
    to: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    text: '帮助',
    to: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const customAsideNavs = [
  {
    text: 'Dashboard',
    to: '/',
    icon: 'home',
  },
  {
    text: '商品管理',
    to: '/goods',
    icon: 'item',
    children: [
      { text: '商品列表', to: '/goods/list' },
      { text: '新增商品', to: '/goods/create' },
    ],
  },
  {
    text: '入库管理',
    to: '/inStock',
    icon: 'forward',
    children: [
      { text: '入库单列表', to: '/inStock/list' },
    ],
  },
  {
    text: '出库管理',
    to: '/outStock',
    icon: 'backward',
    children: [
      { text: '订单管理', to: '/outStock/orders' },
      { text: '出库单列表', to: '/outStock/list' },
    ],
  },
  {
    text: '库存管理',
    to: '/stock',
    icon: 'compass',
    children: [
      { text: '库存列表', to: '/stock/list' },
    ],
  },
  {
    text: '权限管理',
    to: '/authority',
    icon: 'yonghu',
    children: [
      { text: '人员维护', to: '/authority/operator' },
      { text: '角色维护', to: '/authority/role' },
      { text: '角色权限分配', to: '/authority/roleAssianment' },
    ],
  },
  {
    text: '系统管理',
    to: '/sys',
    icon: 'repair',
    children: [
      { text: '库区管理', to: '/sys/StorageArea' },
      {text: '库位管理',to: '/sys/StorageLocation'},
      {text: '数据字典',to: '/sys/dictionary'},
    ],
  }
];

function transform() {
  let userNo = SessionUtil.getUserNo();
  if(userNo == null){
    hashHistory.push('/login');
    return ;
  }
  let url = "/auth/nav?operatorNo="+userNo;
  let navs=[];
  let response = syncGet(url);
  if(response!=undefined && response.status == 'success'){
    navs = response.data;
  }
  return [...navs];
}
// export default {
//   headerNavs: transform([...autoGenHeaderNavs, ...customHeaderNavs]),
//   asideNavs: transform([...autoGenAsideNavs, ...customAsideNavs]),
// };
export const headerNavs = [];

export const asideNavs = transform();
