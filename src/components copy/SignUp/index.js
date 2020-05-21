import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './index.css';
import { Form, Icon, Input, Button, Alert, Typography, Checkbox } from 'antd';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const { Title } = Typography;

const SignUpPage = () => (
    <div>
        <Title level={2}>SignUp</Title>
        <SignUpForm />  
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign-in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase  extends Component {
    constructor(props){
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {username, email, passwordOne, isAdmin } = this.state;
        const roles = [];

        if (isAdmin ) {
            roles.push(ROLES.ADMIN);
        }				

        this.props.firebase
           .doCreateUserWithEmailAndPassword(email, passwordOne)
           .then(authUser => {
            // Create a user in your Firebase realtime database
              return this.props.firebase.user(authUser.user.uid).set({
                    username,
                    email,
                    roles,
                });
           })
           .then(() => {
               return this.props.firebase.doSendEmailVerification();
           })
           .then(() => {
               this.setState({...INITIAL_STATE});
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

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    };

    onChangeCheckbox = event => {
        this.setState({[event.target.name]: event.target.checked});
        this.setState({isAdmin: event.target.checked});
    };

    render(){
       const {
           username,
           email,
           passwordOne,
           passwordTwo,
           isAdmin,
           error,
       } = this.state;

       const isInvalid =
         passwordOne !== passwordTwo ||
         passwordOne === '' ||
         email === '' ||
         username === '';

       return(
            <Form onSubmit={this.onSubmit} className="form">
               <Form.Item>
                 <Input
                  name="username"
                  value={username}
                  onChange={this.onChange}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Full Name"
                 />
               </Form.Item>
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
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
               </Form.Item>
               <Form.Item>
                 <Input
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Confirm Password"
                 />
               </Form.Item>
               <Form.Item>
               <Checkbox onChange={this.onChangeCheckbox}>
                  Admin 
               </Checkbox>                
               </Form.Item>
               <Form.Item>
                  <Button type="primary" htmlType="submit" className="form-button" disabled={isInvalid} >
                   Sign Up
                  </Button>
               </Form.Item>

               {error &&<Alert message={error.message} type="error" banner/>}

          </Form>
       );
    }
}

const SignUpLink = () => (
    <p>
       Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link> 
    </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink };