import React from 'react';
import '../css/style.css';
import logo_red from '../asset/img/logo_red.svg';
import icon_hamburger from '../asset/img/icon/icon_hamburger.svg';
function NavBarMin() {
  return (
    <div className="navBar">
      <img src={logo_red} alt="bizPro Logo" className="navBar__logo" />
      <div className="navBar__list">
        <div className="navBar__item navBar__word">
          <a href="/about"> 關於 BizPro</a>
        </div>
        <div className="navBar__item navBar__word">
          <a href="/journey">學習旅程</a>
        </div>
        <div className="navBar__item navBar__word">
          <a href="/members">歷屆成員</a>
        </div>
        <div className="navBar__item navBar__word">
          <a href="/activity">社群活動</a>
        </div>
        <div className="navBar__item navBar__word">
          <a href="/member_talk">成員心得</a>
        </div>
      </div>
    </div>
  );
}

export default NavBarMin;
