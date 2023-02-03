import React, { useState, useEffect } from 'react';
import localDb from '../config/localDb.json';
import Header from '../components/Header';
import doubleCircleSymbol from '../asset/img/doubleCircle_symbol_white300.svg';
import $ from 'jquery';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import connectionSymbol from '../asset/img/connection_symbol_white300.svg';
import ReactPaginate from 'react-paginate';
function Article() {
  const [articleData, setArticleData] = useState(null);
  const [fieldOptions, setFieldOptions] = useState([]);
  const [majorOptions, setMajorOptions] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const headerWording = localDb.headerWording.article;
  const [popupContent, setPopupContent] = useState({
    name: '',
    number: '',
    jobTitle: '',
    title: '',
    content: '',
    avatar: '',
  });
  // TODO: textarea line break (Someone on stack-overflow said that i should use "\r\n" to replace "\n" instead of using "<br>"
  // but it still doesn't work!!!)
  useEffect(() => {
    let field = [];
    let major = [];
    let fieldOptionsTemp = [];
    let majorOptionsTemp = [];
    const fetchData = async () => {
      await axios
        .get('http://172.20.10.3:5000/api/article/member_talk')
        .then((res) => {
          console.log(res.data);
          setArticleData(res.data);
          setTotalPage(Math.ceil(res.data.length / 6));
          res.data.map((article) => {
            article.tags.map((tag) => {
              if (!field.includes(tag)) {
                field.push(tag);
              }
            });
            if (!major.includes(article.major)) {
              major.push(article.major);
            }
          });
          field.map((item) => {
            fieldOptionsTemp.push({ value: item, label: item });
          });
          major.map((item) => {
            majorOptionsTemp.push({ value: item, label: item });
          });
          setFieldOptions(fieldOptionsTemp);
          setMajorOptions(majorOptionsTemp);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);
  const switchPage = (direction, certainPage) => {
    switch (direction) {
      case 'next':
        if (nowPage < totalPage) {
          document.getElementById('articleSection').scrollIntoView();
          setNowPage(nowPage + 1);
        }
        break;
      case 'prev':
        if (nowPage > 1) {
          document.getElementById('articleSection').scrollIntoView();
          setNowPage(nowPage - 1);
        }
        break;
      case 'last':
        document.getElementById('articleSection').scrollIntoView();
        setNowPage(totalPage);
        break;
      case 'first':
        document.getElementById('articleSection').scrollIntoView();
        setNowPage(1);
        break;
      case 'certainPage':
        document.getElementById('articleSection').scrollIntoView();
        setNowPage(certainPage);
        break;
      default:
        break;
    }
  };
  const Item = (props) => {
    return (
      <div
        className="article__item"
        onClick={() => {
          setPopupContent(articleData[props.id]);
          setTimeout(() => {
            $('.article__detail').css('display', 'flex');
            $('.article__popupLayer').css('display', 'block');
            $('body').css('overflow-y', 'hidden');
          }, 0);
        }}
      >
        <div className="article__item--img">
          <img src={props.avatar} alt="avatar" />
        </div>
        <div className="article__item--content">
          <p className="name">{`${props.number} ${props.name}${'：'}${
            props.jobTitle
          }`}</p>
          <h3 className="title">{`${props.title}`}</h3>
          <p className="content">{props.content.replace(/\\+n/g, '<br/>')}</p>
          <div className="tags">
            {props.tags?.map((tag, i) => {
              return <div className="tag" key={i}>{`測試行業`}</div>;
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
          {/* <img src={props.avatar} alt="avatar" /> */}
          <p className="titleGroup__img--subTitle">
            {`${props.number} ${props.name}${'：'}`}
            {`${props.jobTitle}`}
          </p>
        </div>
        <div className="titleGroup__word">
          <h3 className="titleGroup__word--title">{`${props.title}`}</h3>
        </div>
      </div>
      <p className="article__detail--content">
        {props.content.replace(/\\+n/g, '<br/>')}
        <div className="gradientBox" />
      </p>
    </section>
  );
  return (
    <React.Fragment>
      <Header title={headerWording.title} content={headerWording.content} />
      <section className="article" id="articleSection">
        <img
          src={connectionSymbol}
          alt="connectionSymbol"
          className="connectionSymbolTop connectionSymbol"
        />
        <img
          src={connectionSymbol}
          alt="connectionSymbol"
          className="connectionSymbolBottom connectionSymbol"
        />
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
              />{' '}
              <Button variant="primary" type="submit">
                篩選
              </Button>
            </div>
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
        {articleData?.map((data, i) => {
          if ((nowPage - 1) * 6 <= i && i < nowPage * 6) {
            return (
              <Item
                number={`${data.number}`}
                name={`${data.name}`}
                jobTitle={`${data.jobTitle}`}
                title={`${data.title}`}
                content={`${data.content}`}
                tags={data.tags}
                avatar={data.avatar}
                id={i}
              />
            );
          } else {
            return;
          }
        })}
        <ReactPaginate
          nextLabel="›"
          onPageChange={(e) => {
            switchPage('certainPage', e.selected + 1);
          }}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          pageCount={totalPage}
          previousLabel="‹"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </section>
    </React.Fragment>
  );
}

export default Article;
