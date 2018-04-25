import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@icedesign/base';
import OrderStep from './OrderStep';
import { Moment } from '@icedesign/base';
import Ellipsis from '@icedesign/ellipsis';
const { Row, Col } = Grid;

/**
 * 渲染详情信息的数据
 */
const dataSource = {
  orderNo: 'IN123981234790871432',
  logisName: '顺风速运',
  waybillNo: '123480239487',
  totalCount: '3',
  gmtCreate: '2017-10-18 12:20:07',
  feeAmount: '20',
  consignee:'宝姐',
  consigneeTel: '15612111213',
  consigneeZip:'320000',
  consigneeAddress: '杭州市文一西路',
  memo: '暂无',
};

export default class OrderDetail extends Component {
  static displayName = 'OrderDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const record = this.props.record;
    return (
      <IceContainer>
        <div style={styles.infoColumn}>
          <h5 style={styles.infoColumnTitle}>基本信息</h5>
          <Row wrap style={styles.infoItems}>
            <Col xxs="24" l="8" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>订单号：</span>
              <span style={styles.infoItemValue}>{record.orderNo}</span>
            </Col>
            <Col xxs="24" l="8" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>创建时间：</span>
              <span style={styles.infoItemValue}>{Moment(record.gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>
            </Col>
            <Col xxs="24" l="8" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>商品件数：</span>
              <span style={styles.infoItemValue}>{record.totalCount}</span>
            </Col>
          </Row>
          <Row wrap style={styles.infoItems}>
            <Col xxs="24" l="8" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>物流企业名称：</span>
              <span style={styles.infoItemValue}>{record.logisName}</span>
            </Col>
            <Col xxs="24" l="8" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>运单号：</span>
              <span style={styles.infoItemValue}>{record.waybillNo}</span>
            </Col>
            <Col xxs="24" l="8" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>运费：</span>
              <span style={styles.infoItemValue}>￥{record.feeAmount}</span>
            </Col>
          </Row>
        </div>
        <div style={styles.infoColumn}>
          <h5 style={styles.infoColumnTitle}>更多信息</h5>
          <Row wrap style={styles.infoItems}>
            <Col xxs="24" l="8" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>收货人：</span>
              <span style={styles.infoItemValue}>{record.consignee}</span>
            </Col>
            <Col xxs="24" l="8" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>联系方式：</span>
              <span style={styles.infoItemValue}>{record.consigneeTel}</span>
            </Col>
            <Col xxs="24" l="8" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>邮编：</span>
              <span style={styles.infoItemValue}>{record.consigneeZip}</span>
            </Col>
          </Row>
          <Row wrap style={styles.infoItems}>
            <Col xxs="24" l="8" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>收货地址：</span>
              <span style={styles.infoItemValue}>
              <Ellipsis
               lineLimit={1}
              text={record.consigneeProvince+' '+record.consigneeCity+' '+record.consigneeArea+' '+record.consigneeAddres}/> 
              </span>
            </Col>
            <Col xxs="24" l="8" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>备注：</span>
              <span style={styles.infoItemValue}>{record.memo}</span>
            </Col>
          </Row>
        </div>
        <div style={styles.infoColumn}>
          <h5 style={styles.infoColumnTitle}>订单状态</h5>
          <OrderStep/>
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  basicDetailTitle: {
    margin: '10px 0',
    fontSize: '16px',
  },
  infoColumn: {
    marginLeft: '16px',
  },
  infoColumnTitle: {
    margin: '5px 0',
    paddingLeft: '10px',
    borderLeft: '3px solid #3080fe',
  },
  infoItems: {
    padding: 0,
    marginLeft: '25px',
  },
  infoItem: {
    marginBottom: '18px',
    listStyle: 'none',
    fontSize: '14px',
  },
  infoItemLabel: {
    minWidth: '70px',
    color: '#999',
  },
  infoItemValue: {
    color: '#333',
  },
  attachLabel: {
    minWidth: '70px',
    color: '#999',
    float: 'left',
  },
  attachPics: {
    width: '80px',
    height: '80px',
    border: '1px solid #eee',
    marginRight: '10px',
  },
};
