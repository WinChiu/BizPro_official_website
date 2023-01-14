import $ from 'jquery';
import React, { useState } from 'react';
import avatar from '../asset/img/avatar_sample.webp';
import Header from '../components/Header';
import localDb from '../config/localDb.json';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import Pagination from 'react-bootstrap/Pagination';

/*
TODO:
- 換頁功能
- 串上 API 後的篩選功能
*/

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
  const [fieldOptions, setFieldOptions] = useState('');
  const [memberData, setMemberData] = useState(localDb.memberTemp);

  const headerWording = localDb.headerWording.member;
  const rawMemberData = localDb.memberTemp;

  //let fieldOptions = [];
  rawMemberData.forEach((member) => {
    member.tags.forEach((tag) => {
      if (!fieldOptions.includes(tag)) {
        fieldOptions.push(tag);
      }
    });
  });
  console.log(fieldOptions);
  // const fieldOptions2 = rawMemberData.for;
  // console.log(fieldOptions2);
  const majorOptions = [
    { value: '經濟學系', label: '經濟學系' },
    { value: '國際企業學系', label: '國際企業學系' },
    { value: '財務金融學系', label: '財務金融學系' },
    { value: '電子機械系', label: '電子機械系' },
  ];
  // const fieldOptions = [
  //   { value: '金融業', label: '金融業' },
  //   { value: '顧問業', label: '顧問業' },
  //   { value: '科技業', label: '科技業' },
  //   { value: '社會創新', label: '社會創新' },
  // ];
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
        setPopupContent(memberData[props.id]);
        setTimeout(() => {
          $('.member__popUp').css('display', 'flex');
          $('.member__popupLayer').css('display', 'block');
        }, 100);
      }}
    >
      <div className="item__img">
        <div className="mask">查看成員經歷</div>
        <img src={props.avatar} alt="avatar" className="item__img--img" />
      </div>
      <div className="item__content">
        <p className="item__content--title">
          {props.number} {props.name}
        </p>
        <p className="item__content--subTitle">{props.jobTitle}</p>
      </div>
      <Button
        variant="primary"
        onClick={() => {
          setPopupContent(memberData[props.id]);
          setTimeout(() => {
            $('.member__popUp').css('display', 'flex');
            $('.member__popupLayer').css('display', 'block');
          }, 100);
        }}
      >
        查看成員經歷
      </Button>
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
        <ul>
          {props.exp.map((exp) => (
            <li>{exp}</li>
          ))}
        </ul>
      </div>
    </section>
  );
  const PaginationComponent = () => (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );

  const startFilter = (field) => {
    if (field[0]) {
      let filteredMemberData = rawMemberData.filter((member) =>
        field.some((e) => member.tags.includes(e))
      );
      setMemberData(filteredMemberData);
    } else {
      setMemberData(rawMemberData);
    }
  };
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
                      startFilter(tempArray);
                    }}
                  />
                </div>
                <div className="filter__grade">
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
          {memberData?.map((member, i) => {
            return (
              <MemberItem
                name={`${member.name}`}
                number={`${member.number}`}
                jobTitle={`${member.jobTitle}`}
                exp={`${member.exp}`}
                tags={`${member.tags}`}
                avatar={`${member.avatar}`}
                id={i}
              />
            );
          })}
        </div>
        <PaginationComponent />
      </section>
    </React.Fragment>
  );
}

export default Member;
