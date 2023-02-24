import React, { useEffect } from 'react';
import $ from 'jquery';
import logo from '../asset/img/backstage_logo_black.svg';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Login({ setToken }) {
  useEffect(() => {
    $('#fb-root').css('display', 'none');
    $('.navBar').css('display', 'none');
    $('.footer').css('display', 'none');
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    let token = await axios
      .post('http://localhost:5000/api/auth', {
        email: `${e.target.email.value}`,
        password: `${e.target.psw.value}`,
      })
      .then((res) => {
        return res.data;
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
        <img src={logo} alt="logo" />
        <input type="text" placeholder="信箱" name="email" required />
        <input type="text" placeholder="密碼" name="psw" required />
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
