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
export default class RolePanel extends Component {
    static displayName = 'RolePanel';

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            roleData:MOCK_DATA
        };
    }
    onSelect = (key,menuItem,meta) => {

    }
    render(){
        const roles = this.state.roleData;
        return (
            <div style={styles.rolePanel}>
                <Menu
                    style={styles.menu}
                    onClick={this.props.onClick}
                    onSelect={this.onSelect}
                    onDeselect={this.onDeselect}
                    selectMode="single"
                    autoFocusFirstItem="true"
                >
                    {
                        roles &&
                        roles.length > 0 &&
                        roles.map((role, index) => {
                            return (
                                <Item key={role.id}>
                                    <span>
                                        <Icon type="account" size="small" />
                                        <span className={styles.menu_collapse}>
                                            {role.name}
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
        width:200,
        height:500
    },
    menu_collapse:{
        
    },
    rolePanel:{
        float:"left",
        borderRight: "2px solid #eaeef4",
    }
};