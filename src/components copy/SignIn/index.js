import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import './index.css';
import { Form, Icon, Input, Button, Alert, Typography } from 'antd';


import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const { Title } = Typography;

const SignInPage = () => (
      <div>
          <Title level={2}>SignIn</Title>
          <SignInForm />
          <div>
            <p>sign in with:</p>
            <SignInGoogle />
            <SignInFacebook />
            <SignInTwitter />
          </div>
          <PasswordForgetLink />
          <SignUpLink />
      </div>
  );

  const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
  };

  const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

  class SignInFormBase  extends Component {
      constructor(props){
          super(props);

          this.state = { ...INITIAL_STATE };
      }

      onSubmit = event => {
          const { email, password } = this.state;

          this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
			.catch(error => {
             this.setState({ error });
            });	  

        event.preventDefault();  
      };

      onChange = event => {
          this.setState({ [event.target.name]: event.target.value});
      };

      render(){
          const { email, password, error } = this.state;

          const isInvalid = password === '' || email === '';

          return(
            <Form onSubmit={this.onSubmit} className="login-form">
              <Form.Item>
                <Input
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email Address"
                />
              </Form.Item>
              <Form.Item>         
                <Input
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={isInvalid} className="login-form-button">
                  Sign In
                </Button>
              </Form.Item>
              {error &&<Alert message={error.message} type="error" banner/>}

            </Form>
          );
      }
      
  }
class SignInGoogleBase extends Component {
    constructor(props){
        super(props);

        this.state = { error:null };
    }

    onSubmit = event => {
        this.props.firebase
        .doSignInWithGoogle()
        .then(socialAuthUser => {
         // Create a user in your Firebase Realtime Database too
          return this.props.firebase.user(socialAuthUser.user.uid).set({
              username: socialAuthUser.user.displayName,
              email: socialAuthUser.user.email,
              roles: [],
          });
        })
        .then(() =>{
            this.setState({ error: null});
            this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
            if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                error.message = ERROR_MSG_ACCOUNT_EXISTS;
            }

            this.setState({ error });
        });				 

        event.preventDefault();
    }  ;

    render(){
        const { error } =this.state;

        return(
            <span>
              <Button icon="google" onClick={this.onSubmit} className="login-form-button-social"/>
              {error &&<Alert message={error.message} type="error" banner/>}
            </span>
        );
    }
}

class SignInFacebookBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = { error: null };
    }
  
    onSubmit = event => {
      this.props.firebase
        .doSignInWithFacebook()
        .then(socialAuthUser => {
            // Create a user in your Firebase Realtime Database too
            return this.props.firebase.user(socialAuthUser.user.uid).set({
                username: socialAuthUser.additionalUserInfo.profile.name,
                email: socialAuthUser.additionalUserInfo.profile.email,
                roles: [],
              });
          })
        .then(() => {
          this.setState({ error: null });
          this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
            if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                error.message = ERROR_MSG_ACCOUNT_EXISTS;
            }

          this.setState({ error });
        });
  
      event.preventDefault();
    };
  
    render() {
      const { error } = this.state;
  
      return (
         <spin>
            <Button icon="facebook" onClick={this.onSubmit} className="login-form-button-social"/>
            {error &&<Alert message={error.message} type="error" banner/>}
         </spin>

      );
    }
  }

  class SignInTwitterBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = { error: null };
    }
  
    onSubmit = event => {
      this.props.firebase
        .doSignInWithTwitter()
        .then(socialAuthUser => {
            // Create a user in your Firebase Realtime Database too
            return this.props.firebase.user(socialAuthUser.user.uid).set({
                username: socialAuthUser.additionalUserInfo.profile.name,
                email: socialAuthUser.additionalUserInfo.profile.email,
                roles: [],
              });
          })
        .then(() => {
          this.setState({ error: null });
          this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
            if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                error.message = ERROR_MSG_ACCOUNT_EXISTS;
            }

          this.setState({ error });
        });
  
      event.preventDefault();
    };
  
    render() {
      const { error } = this.state;
  
      return (
         <spin>
           <Button icon="twitter" onClick={this.onSubmit} className="login-form-button-social"/>
           {error &&<Alert message={error.message} type="error" banner/>}
        </spin>

      );
    }
  }

  const SignInForm = compose(
      withRouter,
      withFirebase,
  )(SignInFormBase);

  const SignInGoogle = compose(
    withRouter,
    withFirebase,
  )(SignInGoogleBase);

  const SignInFacebook = compose(
    withRouter,
    withFirebase,
  )(SignInFacebookBase);

  const SignInTwitter = compose(
    withRouter,
    withFirebase,
  )(SignInTwitterBase);

  export default SignInPage;

  export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
