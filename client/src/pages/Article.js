import React, { useState, useRef } from 'react';
import localDb from '../config/localDb.json';
import Header from '../components/Header';
import avatar from '../asset/img/avatar_sample.webp';
import doubleCircleSymbol from '../asset/img/doubleCircle_symbol_white300.svg';
import $ from 'jquery';
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
            onClick={(e) => {
              console.log('Parent');
            }}
          />
        ))}
      </section>
    </React.Fragment>
  );
}

export default Article;
