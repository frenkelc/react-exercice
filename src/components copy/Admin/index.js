import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { Typography } from 'antd';

const { Title } = Typography;

const AdminPage = () => (
   <div>
        <Title level={2}>Admin</Title>
        <p>The Admin Page is accessible by every signed in admin user.</p>

        <Switch>
            <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem}/>
            <Route exact path={ROUTES.ADMIN} component={UserList} />
        </Switch>
    </div>
);
        		   
const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);

