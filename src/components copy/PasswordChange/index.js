import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import './index.css';
import { Form, Icon, Input, Button, Alert } from 'antd';


const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  class PasswordChangeForm extends Component {
      constructor(props){
          super(props);

          this.state = { ...INITIAL_STATE };    
      }

      onSubmit = event => {
          const { passwordOne } = this.state;

          this.props.firebase
          .doPasswordUpdate(passwordOne)
          .than(() => {
              this.setState({ ...INITIAL_STATE });
          })
          .catch(error => {
              this.setState({ error });
          }) ;

          event.preventDefault();
      };

      onChange = event => {
          this.setState({ [event.target.name]: event.target.value});
      };

      render(){
          const { passwordOne, passwordTwo, error } = this.state;

          const isInvalid = 
          passwordOne !== passwordTwo || passwordOne === '';

          return(
              <Form onSubmit={this.onSubmit} className="form">
                  <Form.Item>
                    <Input
                        name="passwordOne"
                        value={this.state.passwordOne}
                        onChange={this.onChange}
                        type="password"
                        placeholder="New Password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                 </Form.Item>
                 <Form.Item>
                    <Input
                        name="passwordTwo"
                        value={this.state.passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Confirm New Password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                 </Form.Item>
                 <Form.Item>
                    <Button disabled={isInvalid} type="primary" htmlType="submit" className="form-button">
                        Reset My Password
                    </Button>
                 </Form.Item>
                 {error &&<Alert message={error.message} type="error" banner/>}
              </Form>
          );
      }
  }

  export default withFirebase(PasswordChangeForm);