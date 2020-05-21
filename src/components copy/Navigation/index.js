import React from 'react';
import { Component } from 'react';

//import NavigationAuth from './NavigationAuth';
//import NavigationNonAuth from './NavigationNonAuth';

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

  /*class Navigation extends Component {
    render(){
      const { authUser } = this.props;
      return(
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
      ));
    }
  }*/


  class NavigationAuth extends Component {

    constructor(props){
        super(props);
       // this.defaultKey = '1';
        //this.selectedKey = '';

        this.state = {
          defaultKey: '1',
          selectedKey: ''
      };

      //this.defaultKey = '1';
      //const selectedKey = '2';
      //this.props.defaultKey  = '1';
      //this.props.selectedKey  = '';
      
    }
 
    //defaultKey = '1';
    //selectedKey = '2';
    
    //componentWillUnmount
    componentDidUnmount  (){
        this.setState({ defaultKey: this.state.selectedKey });
    }

//defaultSelectedKeys={[this.props.history.location.pathname]}
//onSelect={this.onSelect.bind(this)}

    onSelected = event => {
       /* this.setState({selectedKey: key}, function(){
            console.log(this.state);
        });*/
        console.log(event.key);
        console.log(this.state.selectedKey);
    
        this.setState({ defaultKey: event.key });

        console.log(this.state.selectedKey);
    }
    
    render(){
      const { authUser } = this.props;
    
      return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.defaultKey]} onSelect={this.onSelected.bind(this)}>
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
  }
  

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


const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
