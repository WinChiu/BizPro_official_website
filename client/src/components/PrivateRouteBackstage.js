import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Backstage from '../pages/Backstage';
import Login from '../pages/Login';

import { Navigate } from 'react-router-dom';

function PrivateRouteBackstage({ token, backstage }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      window.location.href = '/login';
      return <Navigate to="/login" />;
    }
  }, [isLoggedIn]);
  return <>{isLoggedIn ? <Backstage /> : null}</>;
}

export default PrivateRouteBackstage;
