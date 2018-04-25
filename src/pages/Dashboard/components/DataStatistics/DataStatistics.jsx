import React, { Component } from 'react';
import { Grid, Icon } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';
import './DataStatistics.scss';

const { Row, Col } = Grid;

const dataSource = {
  chartData: [
    { month: '19 日', users: 61 },
    { month: '20 日', users: 115 },
    { month: '21 日', users: 48 },
    { month: '22 日', users: 38 },
    { month: '23 日', users: 48 },
    { month: '24 日', users: 58 },
    { month: '25 日', users: 68 },
    { month: '26 日', users: 88 },
    { month: '27 日', users: 98 },
    { month: '28 日', users: 68 },
  ],
  statisticData: [
    {
      name: '今日订单',
      value: '678',
    },
    {
      name: '今日已发货',
      value: '139',
    },
    {
      name: '今日未发货',
      value: '35623',
    },
    {
      name: '今日访问量',
      value: '16826',
    },
  ],
};

export default class DataStatistics extends Component {
  static displayName = 'DataStatistics';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const cols = {
      users: { tickInterval: 20 },
    };

    return (
      <div className="data-statistics">
        <IceContainer>
          <h4 style={styles.title}>10日订单趋势</h4>
          <Row>
            <Col span="16">
              <Chart
                height={300}
                padding={[50, 35, 50, 35]}
                data={dataSource.chartData}
                scale={cols}
                forceFit
              >
                <Axis name="month" />
                <Axis name="value" />
                <Tooltip crosshairs={{ type: 'y' }} />
                <Geom type="interval" position="month*users" />
              </Chart>
            </Col>
            <Col span="8">
              <ul style={styles.items}>
                {dataSource.statisticData.map((item, index) => {
                  return (
                    <li key={index} className="item-box" style={styles.itemBox}>
                      <div style={styles.itemIcon}>
                        <Icon
                          type="cart"
                          style={styles.icon}
                          className="itemIcon"
                        />
                      </div>
                      <div style={styles.itemText}>
                        <div style={styles.name}>{item.name}</div>
                        <div style={styles.value}>{item.value}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
  },
  title: {
    margin: '0',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
  items: {
    display: 'flex',
    flexDeriction: 'row',
    flexWrap: 'wrap',
    marginLeft: '30px',
  },
  itemBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
    marginTop: '50px',
  },
  itemIcon: {
    marginRight: '10px',
  },
  icon: {
    color: '#3FA1FF',
  },
  value: {
    color: '#1F82FF',
    fontSize: '20px',
  },
  name: {
    fontSize: '12px',
  },
};
