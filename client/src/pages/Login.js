import React, { useEffect } from 'react';
import $ from 'jquery';
import logo from '../asset/img/backstage_logo_black.svg';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Login({ setToken }) {
  const onSubmit = async (e) => {
    let token = await axios
      .post('/api/auth', {
        email: `${e.target.email.value}`,
        password: `${e.target.psw.value}`,
      })
      .then((res) => {
        window.location.replace('/backstage');
        $('.navBar').css('display', 'none');
        return res.data;
      })
      .catch(() => {
        $('.errorText').css('display', 'block');
      });
    setToken(token);
  };

  return (
    <section className="loginContainer">
      <form
        className="formContainer"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        <img src={logo} alt="logo" />{' '}
        <p className="errorText">帳號或密碼錯誤</p>
        <input type="email" placeholder="信箱" name="email" required />
        <input type="password" placeholder="密碼" name="psw" required />
        <div className="buttonGroup">
          <a href="/">
            <p>返回官網</p>
          </a>
          <Button variant="primary" type="submit">
            登入
          </Button>
        </div>
      </form>
    </section>
  );
}

export default Login;
