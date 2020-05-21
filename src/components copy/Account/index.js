import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

import './index.css';
import { Typography, Row, Col, List, Button, Form, Input, Icon, Alert } from 'antd';

const { Title } = Typography;

const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null,
  },
  {
    id: 'google.com',
    provider: 'googleProvider',
  },
  {
    id: 'facebook.com',
    provider: 'facebookProvider',
  },
  {
    id: 'twitter.com',
    provider: 'twitterProvider',
  },
];

const AccountPage = ({ authUser }) => (
    <div>
      <Title level={2}>Account <p><Title level={4}>{authUser.email}</Title></p></Title>
      <div>
        <Row gutter={8}>
        <Col className="row" span={6} className="box">
          <h3>Reset Password</h3>
          <PasswordForgetForm />
        </Col>
        <Col className="row" span={6} className="box">
          <h3>Change Password</h3>
          <PasswordChangeForm />
        </Col>
        <Col className="row" span={6} className="box">
          <LoginManagement authUser={authUser} />
        </Col>
      </Row>
      </div>
  </div>
);

class LoginManagementBase extends Component {
  constructor(props){
    super(props);

    this.state = {
     activeSignInMethods: [],
     error: null
    };
  }
  
  componentDidMount() {
    this.fetchSignInMethods();
  }

  fetchSignInMethods = () => {
    this.props.firebase.auth
    .fetchSignInMethodsForEmail(this.props.authUser.email)
    .then(activeSignInMethods => 
      this.setState({ activeSignInMethods, error : null}),
    )
      .catch(error => this.setState({ error }));
  };

  onSocialLoginLink = provider => {
    this.props.firebase.auth.currentUser
    .linkWithPopup(this.props.firebase[provider])
    .then(this.fetchSignInMethods)
    .catch(error => this.setState({ error }));
  };
  
 onDefaultLoginLink = password => {
    const credential = this.props.firebase.emailAuthProvider.credential(
      this.props.authUser.email,
      password,
    );

    this.props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  onUnlink = providerId => {
    this.props.firebase.auth.currentUser
    .unlink(providerId)
    .then(this.fetchSignInMethods)
    .catch(error => this.setState({ error }));
  };

 render() {
    const { activeSignInMethods, error } = this.state;

    return(
      <div className="div">
        <h3>Sign In Methods:</h3>
        <List>
          {SIGN_IN_METHODS.map(signInMethod => {
            const onlyOneLeft = activeSignInMethods.length === 1;
            const isEnabled = activeSignInMethods.includes(
              signInMethod.id,
            );

            return(
              <List.Item key={signInMethod.id}>
              {signInMethod.id === 'password' ? (
                  <DefaultLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={this.onDefaultLoginLink}
                    onUnlink={this.onUnlink}
                  />
                ) : (
                  <SocialLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={this.onSocialLoginLink}
                    onUnlink={this.onUnlink}
                  />
                )}
              </List.Item>
            );
          })}
        </List>
        {error &&<Alert message={error.message} type="error" banner/>}
      </div>
    );
  }
}

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink,
}) =>
  isEnabled ? (
    <Button
      className="button"
      type="primary" 
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Deactivate {signInMethod.id}
    </Button>
  ) : (
    <Button 
      className="button"
      type="primary"
      onClick={() => onLink(signInMethod.provider)}
    >
      Link {signInMethod.id}
   </Button>
  );

class DefaultLoginToggle extends Component {  
  constructor(props){
    super(props);

    this.state = {passwordOne: '', passwordTwo: '' };
  }

  onSubmit = event => {
    event.preventDefault();

    this.props.onLink(this.state.passwordOne);
    this.setState({ passwordOne: '' , passwordTwo: '' });
  };

  onChange = event => {
    this.setState({[ event.target.name]: event.target.value });
  };

  render() {
    const {
      onlyOneLeft,
      isEnabled,
      signInMethod,
      onUnlink,
    } = this.props;

    const { passwordOne, passwordTwo } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

      return isEnabled ? (
        <Button
          className="button"
          type="primary"
          onClick={() => onUnlink(signInMethod.id)}
          disabled={onlyOneLeft}
        >
          Deactivate {signInMethod.id}
        </Button>
        ) : (
          <Form onSubmit={this.onSubmit} className="form">
            <Form.Item>
              <Input
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="New Password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            </Form.Item>
            <Form.Item>
              <Input
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm New Password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            </Form.Item>
            <Form.Item>
              <Button 
              disabled={isInvalid}
              type="primary" 
              htmlType="submit"
              className="button"
              >
                Link {signInMethod.id}
              </Button>
            </Form.Item>
          </Form>
      );
  }
}					  

const LoginManagement = withFirebase(LoginManagementBase);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

const condition = authUser => !!authUser;

export default compose(
  connect(mapStateToProps),
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);