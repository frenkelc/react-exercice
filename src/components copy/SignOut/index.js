import React from 'react';

import { Button, Icon } from 'antd';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
    <Button type="link" onClick={firebase.doSignOut} style={{ color: 'gray' }}>
    <Icon type="logout"/>
        Sign Out
    </Button>
);

  export default withFirebase(SignOutButton);