import { useState } from 'react';
import axios from 'axios';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('x-auth-token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem('x-auth-token', JSON.stringify(userToken));
    // axios.defaults.headers.common['x-auth-token'] = { test: 1 };
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
