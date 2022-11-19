import React from 'react';
import localDb from '../config/localDb.json';
import Header from '../components/Header';
import avatar from '../asset/img/avatar_sample.webp';

function Member() {
  const headerWording = localDb.headerWording.member;
  const membersEX = localDb.memberTemp;

  const MemberItem = (props) => (
    <div className="member__items--item">
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
  return (
    <React.Fragment>
      <Header title={headerWording.title} content={headerWording.content} />
      <section className="member">
        <div className="member__items">
          {membersEX?.map((member) => {
            return (
              <MemberItem
                name={`${member.name}`}
                number={`${member.number}`}
                jobTitle={`${member.jobTitle}`}
                exp={`${member.exp}`}
                tags={`${member.tags}`}
                avatar=""
              />
            );
          })}
        </div>
      </section>
    </React.Fragment>
  );
}

export default Member;
