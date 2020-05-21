import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';	

import { List, Icon, Pagination } from 'antd';

class UserList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
        };
}        

componentDidMount() {			
    if (!this.props.users.length) {
      this.setState({ loading: true });
    }

    this.props.firebase.users().on('value', snapshot => {
      this.props.onSetUsers(snapshot.val());

      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users } = this.props;
    const { loading } = this.state;							  

    return (
      <div>
        <h2>Users</h2>
        
        {loading && <div>Loading <Icon type="loading"/></div>}
        
        <List grid={{ column: 4 }}
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 2,
              }}        
        > 
          <List.Item column="1">
            <strong>ID</strong> 
          </List.Item>
          <List.Item column="2">
            <strong>Name</strong>
          </List.Item>
          <List.Item column="3">
            <strong>Email</strong>
          </List.Item>
          <List.Item column="4">
            <strong>Details</strong> 
          </List.Item>
        </List>

        <List grid={{ column: 4 }}>
          {users.map(user => (
            <li key={user.uid}>
              <List.Item column="1">              
                {user.uid}
              </List.Item>
              <List.Item column="2">
               {user.username}
              </List.Item>
              <List.Item column="3">
              {user.email}
              </List.Item>
              <List.Item column="4">
                <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
                  See Details
                </Link>
              </List.Item>
            </li>
          ))}
        </List>
        <Pagination defaultCurrent={1} total={30} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: Object.keys(state.userState.users || {}).map(key => ({
    ...state.userState.users[key],
    uid: key,
  })),
});
  
const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: 'USERS_SET', users}),
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(UserList);