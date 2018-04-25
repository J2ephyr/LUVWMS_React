/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Button, Checkbox, Grid, Feedback,Select } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import './UserLogin.scss';
import {hashHistory} from 'react-router' 
import {post,syncGet} from '../../../../utils/Luv';
const { Row, Col } = Grid;

// 寻找背景图片可以从 https://unsplash.com/ 寻找
const backgroundImage =
  'http://cdn.luvletter.cn/thumb-1920-685273.jpg';

export default class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      value: {
        account: undefined,
        password: undefined,
        checkbox: false,
      },
    };
  }

  fetchData = (pid) =>{
    let url = '/common/selectDS?pid='+pid;
    let response = syncGet(url);
    if(response == undefined ||response.status != 'success'){
        return ;
    }

    this.setState({
        dataSource:response.data,
    });
  };
  componentDidMount() {
    this.fetchData(10003);
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { account, password, checkbox, warehouseNo} = this.state.value
    post('/login', {
      account:account,
      password:password,
      checkbox:checkbox,
      warehouseNo:warehouseNo
    })
    .then(function (response) {
      if(response == false){
        return ;
      }
      if(response.data.status=='success'){
        hashHistory.push('/');
      }else{
        Feedback.toast.error("登录失败！用户名或者密码错误");
      }
    });
  };

  render() {
    return (
      <div style={styles.userLogin} className="user-login">
        <div
          style={{
            ...styles.userLoginBg,
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div style={styles.contentWrapper}>
          <h2 style={styles.slogan}>
            欢迎使用 <br /> WMS 仓储管理系统
          </h2>
          <div style={styles.formContainer}>
            <h4 style={styles.formTitle}>登录</h4>
            <IceFormBinderWrapper
              value={this.state.value}
              onChange={this.formChange}
              ref="form"
            >
              <div style={styles.formItems}>
                <Row style={styles.formItem}>
                  <Col>
                    <IceIcon
                      type="person"
                      size="small"
                      style={styles.inputIcon}
                    />
                    <IceFormBinder name="account" required message="必填">
                      <Input maxLength={20} placeholder="账号" />
                    </IceFormBinder>
                  </Col>
                  <Col>
                    <IceFormError name="account" />
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Col>
                    <IceIcon
                      type="lock"
                      size="small"
                      style={styles.inputIcon}
                    />
                    <IceFormBinder name="password">
                      <Input htmlType="password" placeholder="密码" />
                    </IceFormBinder>
                  </Col>
                  <Col>
                    <IceFormError name="account" />
                  </Col>
                </Row>
                <Row style={styles.formItem}>
                  <Col>
                    <IceFormBinder name="warehouseNo">
                      <Select
                        placeholder="请选择仓库"
                        style={styles.warehouseSelect}
                        dataSource={this.state.dataSource}
                       />
                    </IceFormBinder>
                  </Col>
                  <Col>
                    <IceFormError name="account" />
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Col>
                    <IceFormBinder name="checkbox">
                      <Checkbox style={styles.checkbox}>记住账号</Checkbox>
                    </IceFormBinder>
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Button
                    type="primary"
                    onClick={this.handleSubmit}
                    style={styles.submitBtn}
                  >
                    登 录
                  </Button>
                </Row>

              
              </div>
            </IceFormBinderWrapper>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  warehouseSelect:{
    width:'100%',
  },
  userLogin: {
    position: 'relative',
    height: '100vh',
  },
  userLoginBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
  },
  contentWrapper: {
    position: 'absolute',
    top: '-100px',
    left: 0,
    right: 0,
    bottom: 0,
    maxWidth: '1080px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  slogan: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '36px',
    letterSpacing: '2px',
    lineHeight: '48px',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  },
  inputIcon: {
    position: 'absolute',
    left: '18px',
    top: '3px',
    color: '#999',
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
    borderRadius: '28px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  tips: {
    textAlign: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
};
