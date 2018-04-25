import React, { Component } from 'react';
import { Tab } from '@icedesign/base';

const TabPane = Tab.TabPane;

export default class CloseableTab extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        panes:[],
        activeKey:{}
      };
    }
  
    /*eslint-disable eqeqeq */
    remove = (targetKey) => {
      let activeKey = this.state.activeKey;
      let lastIndex;
      this.state.panes.forEach((item, i) => {
        if (item.key == targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.state.panes.filter(pane => pane.key != targetKey);
      if (lastIndex >= 0 && activeKey == targetKey) {
        activeKey = panes[lastIndex].key;
      }
      this.setState({ panes, activeKey });
    }
  
    onClose = (targetKey) => {
      this.remove(targetKey);
    }
  
    onChange = (activeKey) =>  {
      this.setState({ activeKey });
    }
    componentDidMount() {
      const { panes } = this.state;
      if(panes && panes.length != 0){
        return ;
      }
      const children = this.props.children;
      const path = children.props.location.pathname;
      panes.push({
        tab:children.type.displayName,
        key:path,
        content:children,
        closeable:children.type.closeable})
      this.setState({
        panes:panes,
        activeKey:path,
      });
    }
    componentWillReceiveProps(nextProps) {
      const { panes } = this.state;
      const path = nextProps.children.props.location.pathname;
      for(let tab of panes){
        if(tab.key == path){
          this.setState({
            activeKey:path,
          });
          return ;
        }
      }
      panes.push({
        tab:nextProps.children.type.displayName,
        key:path,
        content:nextProps.children,
        closeable:nextProps.children.type.closeable})
      this.setState({
        panes:panes,
        activeKey:path,
      });
  }
  
    render() {
      const { children } =this.props;
      const { activeKey,panes } = this.state;
      return (
        <div>
          <Tab
            type="wrapped"
            activeKey={activeKey}
            closeable
            onChange={this.onChange}
            onClose={this.onClose}
            navStyle={styles.customTab}
          >
            {panes.map(item => (
              <TabPane tab={item.tab} key={item.key} closeable={item.closeable}>
                {item.content}
              </TabPane>
            ))}
          </Tab>
        </div>
      );
    }
  }
const styles={
  customTab:{
    backgroundColor: '#2e323f'
  },
  tabPane:{
    color:'#000',

  }
}
  