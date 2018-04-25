import Menu, { Item } from '@icedesign/menu';
import { get, del } from '../../../../utils/Luv';
import FoundationSymbol from 'foundation-symbol';
import { Icon } from "@icedesign/base";
import React, { Component } from 'react';
const MOCK_DATA = [
    {
        id:"1",
        name:"系统管理员",
    },
    {
        id:"2",
        name:"测试-作业系统"
    },
    {
        id:"3",
        name:"测试-作业系统"
    },
    {
        id:"4",
        name:"测试-作业系统"
    },
    {
        id:"5",
        name:"测试-作业系统"
    }
]
export default class DictionaryPanel extends Component {
    static displayName = 'DictionaryPanel';

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            dataSource:[]
        };
    }
    componentDidMount() {
        this.fetchData();
      }
    fetchData = () => {
        let url = '/sys/dictionary?pid=0';
        get(url).then(response => {
          if(response == false){
            return ;
          }
          if(response.data.status == 'success'){
            this.setState({
              dataSource:response.data.data,
            });
          }
        });
      }
    render(){
        const { dataSource } = this.state;
        return (
            <div style={styles.rolePanel}>
                <Menu
                    style={styles.menu}
                    onClick={this.props.onClick}
                    selectMode="single"
                    autoFocusFirstItem="true"
                >
                    {
                        dataSource &&
                        dataSource.length > 0 &&
                        dataSource.map((dictionary, index) => {
                            return (
                                <Item key={dictionary.rid}>
                                    <span>
                                        <Icon type="arrow-right" size="small" />
                                        <span className={styles.menu_collapse}>
                                            {dictionary.text}
                                        </span>
                                    </span>
                                </Item>
                            )
                        })
                    }
                    
                </Menu>
            </div>
        );
    }
}
const styles = {
    menu:{
        width:160,
        height:500
    },
    menu_collapse:{
        
    },
    rolePanel:{
        float:"left",
        borderRight: "2px solid #eaeef4",
    }
};