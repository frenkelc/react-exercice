import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'antd/dist/antd.css';
import { Layout } from 'antd';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const { Header, Content, Footer, Sider } = Layout;

const App = () => (
    <Router>
       <Layout>
          <Sider>
           <div className="logo" />
           <Navigation/>
         </Sider>

         <Layout>
         {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
            <Content style={{ margin: '35px 20px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 650 }}>
                    <Route exact path={ROUTES.LANDING} component={LandingPage}/>
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
                    <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
                    <Route
                    path={ROUTES.PASSWORD_FORGET}
                    component={PasswordForgetPage}
                    />
                    <Route path={ROUTES.HOME} component={HomePage}/>
                    <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                    <Route path={ROUTES.ADMIN} component={AdminPage}/>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2019 Created by---</Footer>
          </Layout>
       </Layout>
    </Router>
);

export default withAuthentication(App);
