import $ from 'jquery';
import React, { useState } from 'react';
import avatar from '../asset/img/avatar_sample.webp';
import Header from '../components/Header';
import localDb from '../config/localDb.json';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';

function Member() {
  const [popupContent, setPopupContent] = useState({
    name: '',
    number: '',
    jobTitle: '',
    tags: [],
    exp: [],
  });
  const [majorFilter, setMajorFilter] = useState([]);
  const [fieldFilter, setFieldFilter] = useState([]);
  const [gradeFilter, setGradeFilter] = useState('');
  const [directSearch, setDirectSearch] = useState('');

  const headerWording = localDb.headerWording.member;
  const membersEX = localDb.memberTemp;

  const majorOptions = [
    { value: '經濟學系', label: '經濟學系' },
    { value: '國際企業學系', label: '國際企業學系' },
    { value: '財務金融學系', label: '財務金融學系' },
    { value: '電子機械系', label: '電子機械系' },
  ];
  const fieldOptions = [
    { value: '金融業', label: '金融業' },
    { value: '顧問業', label: '顧問業' },
    { value: '科技業', label: '科技業' },
    { value: '社會創新', label: '社會創新' },
  ];
  const gradeOptions = [
    { value: '0', label: '全部屆數' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
  ];

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
        <div className="mask">查看詳細資料</div>
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
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              for (const pair of formData.entries()) {
                setDirectSearch(pair[1]);
              }
            }}
          >
            <div className="member__searchSection--filter">
              <label className="filter__field--tag">條件篩選：</label>
              <div className="filterContainer">
                <div className="filter__major">
                  {/* <label className="filter__field--tag">科系篩選：</label> */}
                  <Select
                    classNamePrefix="filter__field--selector"
                    placeholder="選擇科系"
                    isMulti
                    options={majorOptions}
                    onChange={(choice) => {
                      let tempArray = [];
                      choice.map((option) => {
                        tempArray.push(`${option.value}`);
                      });
                      setMajorFilter(tempArray);
                    }}
                  />
                </div>
                <div className="filter__field">
                  {/* <label className="filter__field--tag">領域篩選：</label> */}
                  <Select
                    classNamePrefix="filter__field--selector"
                    placeholder="選擇領域"
                    isMulti
                    options={fieldOptions}
                    onChange={(choice) => {
                      let tempArray = [];
                      choice.map((option) => {
                        tempArray.push(`${option.value}`);
                      });
                      setFieldFilter(tempArray);
                    }}
                  />
                </div>
                <div className="filter__grade">
                  {/* <label className="filter__grade--tag">屆數篩選：</label> */}
                  <Select
                    classNamePrefix="filter__grade--selector"
                    placeholder="選擇屆數"
                    options={gradeOptions}
                    onChange={(choice) => {
                      setGradeFilter(choice.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="member__searchSection--search">
              <label className="search--directSearchLabel">直接搜尋：</label>
              <div className="searchContainer">
                <input
                  type="text"
                  name="search"
                  placeholder="直接搜尋"
                  className="search--directSearchInput"
                />
                <Button variant="primary" type="submit">
                  搜尋
                </Button>
              </div>
            </div>
          </form>
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
