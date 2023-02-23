import React, { useEffect } from 'react';
import $ from 'jquery';
import logo from '../asset/img/backstage_logo_black.svg';
import Button from 'react-bootstrap/Button';

function Login() {
  useEffect(() => {
    $('#fb-root').css('display', 'none');
    $('.navBar').css('display', 'none');
    $('.footer').css('display', 'none');
  }, []);

  const onSubmit = async (e) => {
    //e.preventDefault();
    //login();
  };

  return (
    <section className="loginContainer">
      <form
        className="formContainer"
        onSubmit={(e) => {
          e.preventDefault();

          //onSubmit(e);
        }}
      >
        <img src={logo} alt="logo" />
        <input type="text" placeholder="密碼" required />
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
