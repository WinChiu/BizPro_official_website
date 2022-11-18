import React from 'react';
import '../css/style.css';
import rounds from '../asset/img/shape_4rounds_white100.svg';
import logo_red from '../asset/img/logo_red.svg';
function Header({ title, content }) {
  return (
    <div className="header">
      <img src={rounds} alt="" className="header__stamp--rounds" />
      <div className="header__content">
        <h4 className="content__title">{title}</h4>
        <h6 className="content__word">{content}</h6>
      </div>
      <img src={logo_red} alt="BizPro logo" className="header__logo" />
    </div>
  );
}

export default Header;
