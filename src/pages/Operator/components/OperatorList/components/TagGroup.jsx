import React, { Component } from 'react';
import { Tag } from '@icedesign/base';

export default class TagGroup extends Component {
    static displayName = 'TagGroup';

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
      super(props);
      this.state = {};
    }
    render(){
        const { roleData } = this.props;
        return (
          <span>
              {
                roleData &&
                roleData.length >0 &&
                roleData.map(role=>{
                    return (
                        <Tag shape="selectable" type="normal" value={role.roleNo}>
                            {role.roleName}
                        </Tag>
                    )
                })
              }
          </span>
      );
    }
}