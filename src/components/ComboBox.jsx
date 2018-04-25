import React, { Component } from 'react';
import { syncGet } from '../utils/Luv';

export default class ComboBox extends Component {
    initCombox = (pid,value) =>{
        let url = '/common/comboBox?pid='+pid+'&value='+value;
        let response = syncGet(url);
        if(response == undefined || response.status != 'success'){
            return;
        }else{
            return response.data.text;
        }
    };
    render(){
        return(
            <span>
                {this.initCombox(this.props.pid,this.props.value)}
            </span>
        )
    }
}