/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Switch, Upload, Grid } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './GoodsForm.scss';
import WebConstant from '../../../../config/WebConstant';
import { syncGet, post } from '../../../../utils/Luv';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;
const { ImageUpload } = Upload;

function beforeUpload(info) {
  console.log('beforeUpload callback : ', info);
}
function getUpToken(info) {
  let imgName = info.name;
  let url = '/common/upToken?fileName='+imgName;
  let upToken = syncGet(url).data;
  if(response == undefined ||response.status != 'success'){
    return ;
}
  let upData = {token:upToken,key:imgName};
  return upData;
}
function onChange(info) {
  console.log('onChane callback : ', info);
}

function onSuccess(res, file) {
  console.log('onSuccess callback : ', res, file);
}

function onError(file) {
  console.log('onError callback : ', file);
}
export default class GoodsForm extends Component {
  static displayName = '新增商品';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.upData = {};
    this.state = {
      value: {
      },
    };
  }
  onDragOver = () => {
    console.log('dragover callback');
  };

  onDrop = (fileList) => {
    console.log('drop callback : ', fileList);
  };

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if(errors){
        return ;
      }
      let imgUrl = values.goodsImg.file.imgURL;
      values.goodsImg = imgUrl;
      post('/goods/create',values).then(response => {
        if(response == false){
          return ;
        }
          if(response.data.status != 'success'){
            alert(response.data.message);
            return ;
          }
          alert('新增成功');
      })
      console.log('errors', errors, 'values', values);
    });
  };

  render() {
    return (
      <div className="settings-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>新增商品</h2>

              <Row style={styles.formItem}>
                <Col span="3" style={styles.label}>
                  商品名称：
                </Col>
                <Col span="10">
                  <IceFormBinder name="goodsName" required max={40} message="必填">
                    <Input size="large" placeholder="请输入商品名称，最大长度：40" />
                  </IceFormBinder>
                  <IceFormError name="goodsName" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col span="3" style={styles.label}>
                  商品图片：
                </Col>
                <Col span="10">
                  <IceFormBinder name="goodsImg" required message="必填">
                    <ImageUpload
                      listType="picture-card"
                      action={WebConstant.QIUNIU_UP_URL}
                      limit={1}
                      maxSize={52428800}
                      data={getUpToken}
                      accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                      locale={{
                        image: {
                          cancel: '取消上传',
                          addPhoto: '上传图片',
                        },
                      }}
                      beforeUpload={beforeUpload}
                      onChange={onChange}
                      onSuccess={onSuccess}
                      onError={onError}
                    />
                  </IceFormBinder>
                  <IceFormError name="goodsImg" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col span="3" style={styles.label}>
                  条形码：
                </Col>
                <Col span="10">
                  <IceFormBinder name="pn" required max={20} message="必填">
                    <Input size="large" placeholder="请输入商品条形码，最大长度：20"/>
                  </IceFormBinder>
                  <IceFormError name="pn" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col span="3" style={styles.label}>
                  规格：
                </Col>
                <Col span="10">
                  <IceFormBinder name="goodsModel" required max={30} message="必填">
                    <Input size="large" placeholder="请输入商品规格，最大长度：30"/>
                  </IceFormBinder>
                  <IceFormError name="goodsModel" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col span="3" style={styles.label}>
                  颜色：
                </Col>
                <Col span="10">
                  <IceFormBinder name="goodsColor" required max={10} message="必填">
                    <Input size="large" placeholder="请输入商品颜色，最大长度：30"/>
                  </IceFormBinder>
                  <IceFormError name="goodsColor" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col span="3" style={styles.label}>
                  商品描述：
                </Col>
                <Col span="10">
                  <IceFormBinder name="goodsBrief">
                    <Input size="large" multiple placeholder="请输入商品描述..." />
                  </IceFormBinder>
                  <IceFormError name="description" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                style={{ width: 100 }}
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  label: {
    textAlign: 'right',
  },
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
