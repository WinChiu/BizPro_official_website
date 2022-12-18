import $ from 'jquery';
import React, { useState } from 'react';
import avatar from '../asset/img/avatar_sample.webp';
import Header from '../components/Header';
import localDb from '../config/localDb.json';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Member() {
  const [popupContent, setPopupContent] = useState({
    name: '',
    number: '',
    jobTitle: '',
    tags: [],
    exp: [],
  });
  const headerWording = localDb.headerWording.member;
  const membersEX = localDb.memberTemp;
  const MemberItem = (props) => (
    <div
      className="member__items--item"
      onClick={() => {
        setPopupContent(membersEX[props.id]);
        setTimeout(() => {
          $('.member__popUp').css('display', 'flex');
          $('.member__popupLayer').css('display', 'block');
          //$('body').css('overflow-y', 'hidden');
        }, 100);
      }}
    >
      <div className="item__img">
        <img src={avatar} alt="avatar" className="item__img--img" />
      </div>
      <div className="item__content">
        <p className="item__content--title">
          {props.number} {props.name}
        </p>
        <p className="item__content--subTitle">{props.jobTitle}</p>
      </div>
    </div>
  );
  const PopUp = ({ props }) => (
    <section className="member__popUp">
      <div className="member__popUp--img">
        <img src={avatar} alt="" />
      </div>
      <div className="member__popUp--content">
        <h3>
          {props.number} {props.name}
        </h3>
        <p>{props.jobTitle}</p>
        <div className="content__tags">
          {props.tags.map((tag) => (
            <div className="content__tags--tag">{tag}</div>
          ))}
        </div>
        {props.exp.map((exp) => (
          <li>{exp}</li>
        ))}
      </div>
    </section>
  );
  return (
    <React.Fragment>
      <Header title={headerWording.title} content={headerWording.content} />
      <section className="member">
        <PopUp props={popupContent} />
        <div
          className="member__popupLayer"
          onClick={() => {
            $('.member__popUp').css('display', 'none');
            $('.member__popupLayer').css('display', 'none');
            //$('body').css('overflow-y', 'scroll');
          }}
        />
        <div className="member__searchSection">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              直接搜尋
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </div>
        <div className="member__items">
          {membersEX?.map((member, i) => {
            return (
              <MemberItem
                name={`${member.name}`}
                number={`${member.number}`}
                jobTitle={`${member.jobTitle}`}
                exp={`${member.exp}`}
                tags={`${member.tags}`}
                avatar=""
                id={i}
              />
            );
          })}
        </div>
      </section>
    </React.Fragment>
  );
}

export default Member;
