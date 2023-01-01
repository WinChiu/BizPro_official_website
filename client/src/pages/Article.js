import React, { useState, useRef } from 'react';
import localDb from '../config/localDb.json';
import Header from '../components/Header';
import avatar from '../asset/img/avatar_sample.webp';
import doubleCircleSymbol from '../asset/img/doubleCircle_symbol_white300.svg';
import $ from 'jquery';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';

function Article() {
  const [popupContent, setPopupContent] = useState({
    name: '',
    number: '',
    jobTitle: '',
    title: '',
    content: '',
  });
  const headerWording = localDb.headerWording.article;
  const articleEx = localDb.articleTemp;

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
  const Item = (props) => {
    return (
      <div
        className="article__item"
        onClick={() => {
          setPopupContent(articleEx[props.id]);
          setTimeout(() => {
            $('.article__detail').css('display', 'flex');
            $('.article__popupLayer').css('display', 'block');
            $('body').css('overflow-y', 'hidden');
          }, 0);
        }}
      >
        <div className="article__item--img">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="article__item--content">
          <p className="name">{`${props.number} ${props.name}${'：'}${
            props.jobTitle
          }`}</p>
          <h3 className="title">{`${props.title}`}</h3>
          <p className="content">{props.content.replace(/\\+n/g, '<br/>')}</p>
          <div className="tags">
            {props.tags?.map((tag, i) => {
              return <div className="tag" key={i}>{`${tag}`}</div>;
            })}
          </div>
        </div>
      </div>
    );
  };

  const PopUp = ({ props }) => (
    <section className="article__detail">
      <img
        src={doubleCircleSymbol}
        alt="doubleCircleSymbol"
        className="doubleCircleSymbol"
      />
      <div className="article__detail--titleGroup">
        <div className="titleGroup__img">
          <img src={avatar} alt="avatar" />
          <p className="titleGroup__img--subTitle">
            {`${props.number} ${props.name}${'：'}`}
            {/* <br /> */}
            {`${props.jobTitle}`}
          </p>
        </div>
        <div className="titleGroup__word">
          <h3 className="titleGroup__word--title">{`${props.title}`}</h3>
        </div>
      </div>
      <p className="article__detail--content">
        {props.content.replace(/\\+n/g, '<br/>')}
      </p>
    </section>
  );

  return (
    <React.Fragment>
      <Header title={headerWording.title} content={headerWording.content} />
      <section className="article">
        <PopUp props={popupContent} />
        <div className="article__searchSection">
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
            }}
          >
            <div className="article__searchSection--filter ">
              <label className="filter__major--tag">條件篩選：</label>
              <Select
                classNamePrefix="filter__major--selector"
                placeholder="選擇科系"
                isMulti
                options={majorOptions}
                onChange={(choice) => {
                  let tempArray = [];
                  choice.map((option) => {
                    tempArray.push(`${option.value}`);
                  });
                  // setMajorFilter(tempArray);
                }}
              />
            </div>
            <div className="article__searchSection--filter">
              {/* <label className="filter__major--tag">科系篩選：</label> */}
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
                  // setMajorFilter(tempArray);
                }}
              />
            </div>
            <Button variant="primary" type="submit">
              篩選
            </Button>
          </form>
        </div>
        <div
          className="article__popupLayer"
          onClick={() => {
            $('.article__detail').css('display', 'none');
            $('.article__popupLayer').css('display', 'none');
            $('body').css('overflow-y', 'scroll');
          }}
        />
        {articleEx?.map((data, i) => (
          <Item
            number={`${data.number}`}
            name={`${data.name}`}
            jobTitle={`${data.jobTitle}`}
            title={`${data.title}`}
            content={`${data.content}`}
            tags={data.tags}
            id={i}
          />
        ))}
      </section>
    </React.Fragment>
  );
}

export default Article;
