import React, { Component } from 'react';
import { syncGet } from '../utils/Luv';
import { Select } from "@icedesign/base";

export default class LuvSelect extends Component {
    constructor(props) {
        super(props);
        this.queryCache = {};
        this.state = {
          dataSource: [],      
        };
    }
    fetchData = (pid) =>{
        let url = '/selectDS?pid='+pid;
        let response = syncGet(url);
        if(response.status != 'success'){
            this.setState({
                dataSource:[{label:'系统错误',value:'0'}]
            });
        }else{
            this.setState({
                dataSource:response.data.data,
            });
        }
    };
    componentDidMount() {
        this.fetchData();
      }
    render(){
        return(
            <Select
             dataSource={this.state.dataSource}
             />
        )
    }
}