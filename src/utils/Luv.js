import axios from 'axios';
import { hashHistory } from 'react-router';
import { Dialog } from "@icedesign/base";
import jsonwebtoken from "jsonwebtoken"
import SessionUtil from "./SessionUtil";
import WebConstant from "../config/WebConstant";
import $ from 'jquery';
axios.defaults.baseURL = WebConstant.BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    let token = SessionUtil.getToken();
    if(token){
        config.headers.Authorization = token;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  if(response.status == '200'){
    let token = response.headers.authorization;
    if(token){
      let accessToken = SessionUtil.getToken();
      if(accessToken){
        sessionStorage.removeItem('access_token');
      }
      SessionUtil.setToken(token);
      let jwt = require('jsonwebtoken');
      token = token.replace(WebConstant.TOKEN_PRE,"");
      let userInfo = jwt.decode(token);
      SessionUtil.setUserInfo(userInfo.account,userInfo.role);
     }
    return response;
  }}, function (error) {
    const status = error.response.status;
    if(403 == status){
      hashHistory.push("/notPermission");
    }else if(404 == status){
      hashHistory.push("/notFound");
    }else{
      hashHistory.push("/exception");
    }
    return false;
  });
  export const post = (url, params) => {

    return axios({
  
      method: 'post',
  
      url: url,
  
      data: params,
  
    });
  
  }
  
  export const uploadFileRequest = (url, params) => {
  
    return axios({
  
      method: 'post',
  
      url: `${base}${url}`,
  
      data: params,
  
      headers: {
  
        'Content-Type': 'multipart/form-data'
  
      }
  
    });
  
  }
  
  export const put= (url, params) => {
  
    return axios({
  
      method: 'put',
  
      url: url,
  
      data: params
  
    });
  
  }
  
  export const del = (url) => {
  
    return axios({
  
      method: 'delete',
  
      url: url
  
    });
  
  }
  
  export const get = (url,param) => {
    return axios({
      params : param,

      method: 'get',
  
      url: url
  
    });
  
  }
  export const syncGet = (url) => {
    let rData;
    $.ajax({
      url:WebConstant.BASE_URL+url,
      type:'GET',
      async:false,
      dataType:'json',
      success:function(data){
        rData=data;
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        if(403 == XMLHttpRequest.status){
          hashHistory.push("/notPermission");
        }else if(404 == XMLHttpRequest.status){
          hashHistory.push("/notFound");
        }else{
          hashHistory.push("/exception");
        }
      }
    })
    return rData;
  }
  export const getNavs = () => {
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
