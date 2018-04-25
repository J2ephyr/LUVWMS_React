import { get, del } from '../../../../utils/Luv';
import FoundationSymbol from 'foundation-symbol';
import React, { Component } from 'react';
import { Tree, Button, Icon } from '@icedesign/base';
import RolePanel from '../RolePanel/RolePanel';
import IceContainer from '@icedesign/container';

const { Node: TreeNode } = Tree;

export default class PermissionPanel extends Component {
    static displayName = 'PermissionPanel';

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.queryCache = {};
        this.state = {
            roleData:[],
            checkedKeys:[],
            expandedKeys:[],
        };
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData = (key) => {
        if(key === undefined){
            return false;
        }
        let {key:roleNo} = key; 
        let url = '/roleAssianment/tree?key='+roleNo;
        get(url).then(response => {
          if(response.data.status == 'success'){
              let keys = this.getCheckedKeys(response.data.data);
            this.setState({
                roleData:response.data.data,
                checkedKeys:keys,
                expandedKeys:keys,
            });
          }
        });
    }
    getCheckedKeys = (roleData) => {
        let keys=[];
        roleData.map(permission=>{
            if(permission.permissionChild && permission.permissionChild.length>0){
                permission.permissionChild.map(child=>{
                    if(child.check == "1"){
                        keys.push(child.permissionNo)
                    }
                });
            }
        });
        return keys;
    }
    onCheck = (checkedKeys) => {
        this.setState({
            checkedKeys:checkedKeys
        });
    }
    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys:expandedKeys,
        });
    }
    modifyClick = () => {

    }
    render(){
        const { roleData, checkedKeys, expandedKeys } = this.state;
        return (
            <IceContainer>
                   <RolePanel onClick={this.fetchData}/>
            <IceContainer style={styles.ice}>
            <div style={styles.tree}>
            <Tree
                multiple
                checkable
                showLine
                expandedKeys={expandedKeys}
                checkedKeys={checkedKeys}
                onCheck={this.onCheck}
                onExpand={this.onExpand}
            >
                <TreeNode label="系统模块" key="0">
                    {roleData.map(permission=>{
                        if(permission.permissionChild && permission.permissionChild.length>0){
                            return (
                                <TreeNode label={permission.permissionName} key={permission.permissionNo}>
                                    {permission.permissionChild.map(child=>{
                                        return (
                                            <TreeNode
                                             label={child.permissionName}
                                             key={child.permissionNo}     
                                             />
                                        )
                                    })}
                                </TreeNode>
                            )
                        }
                    })}
                </TreeNode>

            </Tree>
            </div>
            <div style={styles.modifyBtn}>
            <Button shape="primary" onClick={this.modifyClick}>
                <Icon type="set" />修改
            </Button>
            <Button shape="primary" onClick={this.modifyClick}>
                <Icon type="add" />添加
            </Button>
            </div>
            </IceContainer>
            
            </IceContainer>
        )
    }
    
}
const styles = {
    ice:{
        padding:10,
    },
    tree:{
        float:"left",
    },
    modifyBtn:{
        position:"relative",
        marginLeft:260,
        marginTop:540,
    },
    moudleTitle:{
        float:"left",
    },
    urlTitle:{
        marginLeft:"30"
    }
};