import React, { Component } from 'react';								   
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Typography } from 'antd';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';	 
import Messages from '../Messages';

const { Title } = Typography;		   

class HomePage extends Component {
    componentDidMount() {
    this.props.firebase.users().on('value', snapshot => {
      this.props.onSetUsers(snapshot.val());
    });
  }
  
    componentWillUnmount() {
      this.props.firebase.users().off();
    }
  
    render() {
      const { users } = this.props;
  
      return (
        <div>
          <Title level={2}>Home Page</Title>
          <p>The Home Page is accessible by every signed in user.</p>
  
          <Messages users={users} />
        </div>
      );
    }
  }

const mapStateToProps = state => ({
  users: state.userState.users,
});
  										 
const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: 'USERS_SET', users }),
});

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);