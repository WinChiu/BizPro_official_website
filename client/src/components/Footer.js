import React from 'react';
import '../css/style.css';
import icon_facebook from '../asset/img/icon/icon_facebook.svg';
import icon_linkedin from '../asset/img/icon/icon_linkedin.svg';
import icon_email from '../asset/img/icon/icon_email.svg';

function Footer() {
  return (
    <div className="footer">
      <p className="footer__hashtag">#BeAGameChanger</p>
      <div className="linkList">
        <a className="linkList__item" href="https://www.google.com/">
          <img
            src={icon_facebook}
            alt="BizPro facebook"
            className="linkList__icon icon--facebook"
          />
          <p className="linkList__word">BizPro 台大商學研究社</p>
        </a>
        <a className="linkList__item" href="/">
          <img
            src={icon_linkedin}
            alt="BizPro linkedin"
            className="linkList__icon icon--linkedin"
          />
          <p className="linkList__word">BizPro Taipei</p>
        </a>
        <a className="linkList__item" href="/">
          <img
            src={icon_email}
            alt="BizPro email"
            className="linkList__icon icon--email"
          />
          <p className="linkList__word">bizpro.taipei@gmail.com</p>
        </a>
      </div>
      <div className="caption">
        <p className="notation__word">
          © 2022 BizPro 台大商學研究社. All rights Reserved. Site by BizPro 21st
          & 22nd
        </p>
      </div>
    </div>
  );
}

export default Footer;
