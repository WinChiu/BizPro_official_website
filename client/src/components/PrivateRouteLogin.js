import React from 'react';
import axios from 'axios';
import Backstage from '../pages/Backstage';
import Login from '../pages/Login';

import { Navigate } from 'react-router-dom';

function PrivateRouteLogin({ token }) {
  const isLogin = async () => {
    return await axios
      .get('/api/auth/is_login', {
        headers: {
          'x-auth-token': token,
        },
      })
      .then(() => <Backstage />)
      .catch(() => <Backstage />);
  };
  isLogin();
  return <Login />;
  // return isLogin() ? <Backstage /> : <Navigate to="/login" />;
}

export default PrivateRouteLogin;
