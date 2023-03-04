import axios from 'axios';
import React from 'react';
import Backstage from '../pages/Backstage';
import Login from '../pages/Login';


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
