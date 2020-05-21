import React from 'react';
//import { Component } from 'react';
//import {Location} from '@reach/router'

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Menu, Icon} from 'antd';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';


const Navigation = ({ authUser }) =>
  authUser ? (
    <NavigationAuth authUser={authUser} />
  ) : (
    <NavigationNonAuth />
  );

  /*class NavigationAuth extends Component {

    render(){
      const { authUser, location } = this.props;
      return (
         <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.history.location.pathname]}>
        <Menu.Item key="1">
          <Link to={ROUTES.LANDING}>Landing</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={ROUTES.HOME}><Icon type="home"/>Home</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={ROUTES.ACCOUNT}><Icon type="account-book"/>Account</Link>
        </Menu.Item>
        {authUser.roles.includes(ROLES.ADMIN) && ( 
        <Menu.Item key="4">
        <Link to={ROUTES.ADMIN}><Icon type="control"/>Admin</Link>
        </Menu.Item>
        )}
        <Menu.Item>
          <SignOutButton />
        </Menu.Item>
    </Menu>
      )
    }
  }*/

const NavigationAuth = ({ authUser }) => (
   <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to={ROUTES.LANDING}>Landing</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={ROUTES.HOME}><Icon type="home"/>Home</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={ROUTES.ACCOUNT}><Icon type="account-book"/>Account</Link>
        </Menu.Item>
        {authUser.roles.includes(ROLES.ADMIN) && ( 
        <Menu.Item key="4">
        <Link to={ROUTES.ADMIN}><Icon type="control"/>Admin</Link>
        </Menu.Item>
        )}
        <Menu.Item>
          <SignOutButton />
        </Menu.Item>
    </Menu>
);

const NavigationNonAuth = () => (
     <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to={ROUTES.LANDING}>Landing</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={ROUTES.SIGN_IN}><Icon type="login"/>Sign In</Link>
        </Menu.Item>
     </Menu>
);

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
