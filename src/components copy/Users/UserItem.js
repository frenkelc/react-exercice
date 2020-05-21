import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

import { Button, Icon, List } from 'antd';

class UserItem  extends Component {
    constructor(props){
        super(props);

        this.state = { 
            loading : false,
        };
    }

    componentDidMount() {
        if (!this.props.user) {
          this.setState({ loading: true });

          this.props.firebase
            .user(this.props.match.params.id)
            .on('value', snapshot => {
              this.props.onSetUser(
                snapshot.val(),
                this.props.match.params.id,
              );

              this.setState({ loading: false });
            });
        }
    }

    componentWillUnmount() {
        this.props.firebase.user(this.props.match.params.id).off();
    }

    onSendPasswordResetEmail  = () =>  {
        this.props.firebase.doPasswordReset(this.props.user.email);
    };

    render() {
      const { user } = this.props;
      const { loading } = this.state;

      return (
        <div>
          <br/><br/>
          <h2>{user &&  <span>{user.username}</span>}</h2>

          {loading && <div>Loading <Icon type="loading"/></div>}
  
          {user && (
            <List grid={{ column: 4 }}>
            <List.Item column="1">              
              <strong>ID:</strong> {this.props.match.params.id}
              </List.Item>
              <List.Item column="2">
                <strong>Name:</strong> {user.username}
              </List.Item>
              <List.Item column="3">
                <strong>Email:</strong>  {user.email}
              </List.Item>
              <List.Item column="4">
                <Button
                  type="primary"
                  onClick={this.onSendPasswordResetEmail}
                >
                  Send Password Reset
                </Button>
              </List.Item>
            </List>
          )}
        </div>
      );
  }
}
           
const mapStateToProps = (state, props) => ({
  user: (state.userState.users || {})[props.match.params.id],
});

const mapDispatchToProps = dispatch => ({
  onSetUser: (user, uid) => dispatch({ type: 'USER_SET', user, uid}),
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(UserItem);