import React, { useState } from 'react';
import '../css/style.css';
import logo_red from '../asset/img/logo_red.svg';
import icon_hamburger from '../asset/img/icon/icon_hamburger.svg';
import $ from 'jquery';

function NavBarMin() {
  const [dropDownOpen, setdropDownOpen] = useState(false);
  return (
    <div className="navBar">
      <img src={logo_red} alt="bizPro Logo" className="navBar__logo" />
      <div className="navBar__list">
        <img
          className="navBar__item navBar__hamburger"
          src={icon_hamburger}
          alt=""
          onClick={() => {
            if (dropDownOpen === false) {
              setdropDownOpen(true);
              $('.navBar__dropdown').css('display', 'block');
            } else {
              setdropDownOpen(false);
              $('.navBar__dropdown').css('display', 'none');
            }
          }}
        />
      </div>
      <div className="navBar__dropdown">
        <div className="dropdown__item">
          <a href="/about">關於 BizPro</a>
        </div>
        <div className="dropdown__item">
          <a href="/journey">學習旅程</a>
        </div>
        <div className="dropdown__item">
          <a href="/members">歷屆成員</a>
        </div>
        <div className="dropdown__item">
          <a href="/activity">社群活動</a>
        </div>
        <div className="dropdown__item">
          <a href="/member_talk">成員心得</a>
        </div>
      </div>
    </div>
  );
}

export default NavBarMin;
