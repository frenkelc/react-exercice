import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import './index.css';
import { Form, Icon, Input, Button, Typography, Alert } from 'antd';

const { Title } = Typography;

const PasswordForgetPage = () => (
    <div>
        <Title level={2}>Forget Password</Title>
        <PasswordForgetForm />
    </div>
);

const INITIAL_STATE ={
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props){
        super(props);

        this.state ={ ...INITIAL_STATE};
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
        .doPasswordReset(email)
        .then(() => {
            this.setState({ ...INITIAL_STATE });
        })
        .catch(error => {
            this.setState({ error });
        });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render(){
        const { email, error } = this.state;

        const isInvalid = email === '';

        return(
            <Form onSubmit={this.onSubmit} className="form">
                <Form.Item>
                    <Input
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Email Address"     
                   />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={isInvalid} className="form-button">
                        Reset My Password
                    </Button>
                </Form.Item>
            
            {error &&<Alert message={error.message} type="error" banner/>}

            </Form>
        );
    }
}

const PasswordForgetLink =() =>(
    <Form.Item>
        <Link to={ROUTES.PASSWORD_FORGET}>Forget Password</Link>
    </Form.Item>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink};