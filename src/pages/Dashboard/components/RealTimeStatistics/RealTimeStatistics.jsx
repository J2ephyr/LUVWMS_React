import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@icedesign/base';

const { Row, Col } = Grid;

export default class RealTimeStatistics extends Component {
  static displayName = 'RealTimeStatistics';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="real-time-statistics">
        <IceContainer>
          <Row style={styles.items}>
            <Col span="6" style={styles.item}>
              <div style={{ ...styles.itemBody, ...styles.green }}>
                <div style={styles.itemTitle}>
                  <p style={styles.titleText}>商品种类统计</p>
                  <span style={styles.tag}>实时</span>
                </div>
                <div style={styles.itemContent}>
                  <h2 style={styles.itemNum}>7,993</h2>
                  <div style={styles.itemMeta}>
                    <p style={styles.total}>7,993</p>
                    <p style={styles.desc}>当前商品种类总记录数</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col span="6" style={styles.item}>
              <div style={{ ...styles.itemBody, ...styles.lightBlue }}>
                <div style={styles.itemTitle}>
                  <p style={styles.titleText}>库存统计</p>
                  <span style={styles.tag}>实时</span>
                </div>
                <div style={styles.itemContent}>
                  <h2 style={styles.itemNum}>113,112</h2>
                  <div style={styles.itemMeta}>
                    <p style={styles.total}>113,112</p>
                    <p style={styles.desc}>当前总库存数</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col span="6" style={styles.item}>
              <div style={{ ...styles.itemBody, ...styles.darkBlue }}>
                <div style={styles.itemTitle}>
                  <p style={styles.titleText}>员工数量统计</p>
                  <span style={styles.tag}>实时</span>
                </div>
                <div style={styles.itemRow}>
                  <div style={styles.itemCol}>
                    <h2 style={styles.itemNum}>908</h2>
                    <p style={styles.desc}>拣选人员</p>
                  </div>
                  <div style={styles.itemCol}>
                    <h2 style={styles.itemNum}>263</h2>
                    <p style={styles.desc}>打包人员</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col span="6" style={styles.item}>
              <div style={{ ...styles.itemBody, ...styles.navyBlue }}>
                <div style={styles.itemTitle}>
                  <p style={styles.titleText}>耗材统计</p>
                  <span style={styles.tag}>实时</span>
                </div>
                <div style={styles.itemRow}>
                  <div style={styles.itemCol}>
                    <h2 style={styles.itemNum}>4908</h2>
                    <p style={styles.desc}>已消耗</p>
                  </div>
                  <div style={styles.itemCol}>
                    <h2 style={styles.itemNum}>11263</h2>
                    <p style={styles.desc}>剩余数量</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  items: {
    padding: 0,
  },
  itemBody: {
    padding: '12px',
    borderRadius: '4px',
    color: '#fff',
    height: '144px',
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    position: 'relative',
  },
  titleText: {
    margin: 0,
    fontSize: '14px',
  },
  tag: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: '2px 4px',
    borderRadius: '4px',
    fontSize: '12px',
    background: 'rgba(255, 255, 255, 0.3)',
  },
  itemNum: {
    margin: '20px 0',
    fontSize: '32px',
  },
  total: {
    margin: 0,
    fontSize: '12px',
  },
  desc: {
    margin: 0,
    fontSize: '12px',
  },
  green: {
    background: '#31B48D',
  },
  lightBlue: {
    background: '#38A1F2',
  },
  darkBlue: {
    background: '#7538C7',
  },
  navyBlue: {
    background: '#3B67A4',
  },
};
