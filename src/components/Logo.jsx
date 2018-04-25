import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo" style={{}}>
        <span className="logo-text">
          WMS 
        </span>
        <span className="logo-word">管理系统</span>
      </div>
    );
  }
}
