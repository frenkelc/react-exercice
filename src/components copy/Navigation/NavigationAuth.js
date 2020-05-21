
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon} from 'antd';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

class NavigationAuth extends Component {

    static defaultKey ='1';
    //static selectedKey ='2';

    constructor(props){
        super(props);
        this.defaultKey = '1';
        this.selectedKey = '2';

       /* this.state = {
            defaultKey: '1',
            selectedKey: ''
          }*/
    }

    
    componentDidMount(){
    //    this.setState({defaultKey: this.state.selectedKey});
        this.defaultKey = this.selectedKey;
    }

//defaultSelectedKeys={[this.props.history.location.pathname]}
//onSelect={this.onSelect.bind(this)}

    onSelected(key){
       /* this.setState({selectedKey: key}, function(){
            console.log(this.state);
        });*/

        //this.props.selectedKey = key;
        //this.selectedKey = '2';
        console.log(this.selectedKey);
    }
    
    render(){
      const { authUser, location } = this.props;
    
      return (
         <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.defaultKey]} onSelect={this.onSelected}>
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

  export default NavigationAuth;
