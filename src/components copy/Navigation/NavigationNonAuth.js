
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon} from 'antd';

import * as ROUTES from '../../constants/routes';

class NavigationNonAuth extends Component {
    render() {
      return(
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to={ROUTES.LANDING}>Landing</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={ROUTES.SIGN_IN}><Icon type="login"/>Sign In</Link>
        </Menu.Item>
      </Menu>
      );
    }
  }

  export default NavigationNonAuth;
