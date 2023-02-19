import axios from 'axios';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import cross from '../asset/img/icon/icon_crossWhite.svg';
import icon_edit from '../asset/img/icon/icon_edit.svg';
import icon_upload from '../asset/img/icon/icon_upload.svg';
import icon_x from '../asset/img/icon/icon_x.svg';
import icon_x_circle from '../asset/img/icon/icon_x_circle.svg';
import numberToRank from '../utility/numberToRank';

function BackstageArticleTable() {
  const [articleData, setArticleData] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const [toastContent, setToastContent] = useState('');
  const [modalTitle, setModalTitle] = useState('資料刪除警告');
  const [modalContent, setModalContent] = useState('');
  const [targetArticle, setTargetArticle] = useState({
    name: '',
    number: '',
    jobTitle: '',
    title: '',
    content: '',
    avatar: '',
  });

  // Load Data
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get('http://localhost:5000/api/article/member_talk')
        .then((res) => {
          setArticleData(res.data);
          setTotalPage(Math.ceil(res.data.length / 10));
        })
        .catch((error) => console.log(error));
    };
    fetchData();
    return;
  }, []);

  // Components

  const WarningToast = () => {
    <div className="toastComponent warning">
      <p>{toastContent ? toastContent : '無提示訊息'}</p>
      <img src={cross} alt="toastClose" className="toastClose" />
    </div>;
  };
  const SuccessToast = () => (
    <div className="toastComponent success">
      <p>{toastContent ? toastContent : '無提示訊息'}</p>
      {/* <img src={cross} alt="" className="toastClose" /> */}
    </div>
  );
  const WarningModal = () => (
    <div className="modal show warningModal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            <strong>{modalTitle ? modalTitle : '標題載入錯誤'}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalContent ? modalContent : '內文載入錯誤'}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              $('.warningModal').css('display', 'none');
            }}
          >
            取消
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteArticle(targetArticle);
              $('.warningModal').css('display', 'none');
            }}
          >
            確定
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
  const PictureUploadModal = () => {
    //TODO: get current avatar url and fill in input field. If not, then leave empty
    return (
      <div className="modal show pictureModal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>
              <strong>請輸入圖片位址</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="url"
              name="search"
              placeholder="https://example.com/avatar.jpg"
              className="pictureUrlInput"
              defaultValue={`${
                targetArticle.avatar ? targetArticle.avatar : ''
              }`}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                $('.modal').css('display', 'none');
              }}
            >
              取消
            </Button>
            <Button
              variant="success"
              onClick={() => {
                updateAvatar();
              }}
            >
              確定
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  };
  const DataEditModal = () => {
    return (
      <div className="modal show dataModal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>
              <strong>編輯或新增心得</strong>
            </Modal.Title>
          </Modal.Header>
          <form
            onSubmit={() => {
              updateAvatar();
            }}
          >
            <Modal.Body>
              <div className="container container__row1">
                <label>姓名</label>
                <input
                  type="text"
                  name="name"
                  placeholder="姓名"
                  className="nameInput"
                  defaultValue={`${
                    targetArticle.name ? targetArticle.name : ''
                  }`}
                />
                <label>屆數</label>
                <input
                  type="text"
                  name="number"
                  placeholder="屆數"
                  className="numberInput"
                  defaultValue={`${
                    targetArticle.number ? targetArticle.number : ''
                  }`}
                />
              </div>
              {/* <div className="container container__row2">
                <label>頭銜</label>
                <input
                  type="text"
                  name="title"
                  placeholder="頭銜"
                  className="titleInput"
                  defaultValue={`${
                    targetArticle.jobTitle ? targetArticle.jobTitle : ''
                  }`}
                />
              </div> */}
              <div className="container container__row2">
                <label>標題</label>
                <input
                  type="text"
                  name="articleTitle"
                  placeholder="心得文標題"
                  className="articleTitleInput"
                  defaultValue={`${
                    targetArticle.title ? targetArticle.title : ''
                  }`}
                />
              </div>
              <div className="container container__row3">
                <label>內文</label>
                <textarea
                  className="contentInput"
                  name="content"
                  cols="30"
                  rows="10"
                  defaultValue={targetArticle.content}
                  placeholder="心得文內文"
                ></textarea>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                  $('.modal').css('display', 'none');
                }}
              >
                取消
              </Button>
              <Button
                type="submit"
                variant="success"
                onClick={(e) => {
                  updateAvatar();
                }}
              >
                更新
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Dialog>
      </div>
    );
  };
  const ArticleRow = ({ name, number, jobTitle, title, avatar, content }) => (
    <tr
      data-name={name}
      data-number={number}
      data-avatar={avatar}
      data-content={content}
    >
      <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="nameContent data"
      >
        {name ? name : <span className="noData">查無資料</span>}
      </td>
      <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="numberContent data"
      >
        {number ? number : <span className="noData">查無資料</span>}
      </td>
      {/* <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="jobTitleContent data"
      >
        {jobTitle ? jobTitle : <span className="noData">查無資料</span>}
      </td> */}
      <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="titleContent data"
      >
        {title ? title : <span className="noData">查無資料</span>}
      </td>
      <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="contentContent data"
      >
        {content ? content : <span className="noData">查無資料</span>}
      </td>
      <td>
        {avatar ? (
          <>
            <Button
              variant="primary"
              className="btn-reupload"
              onClick={(e) => {
                getTargetAlumni(e);
                setTimeout(() => {
                  $('.pictureModal').css('display', 'block');
                }, 100);
              }}
            >
              重新上傳
            </Button>
            <a href={avatar} className="avatarContent">
              檢視
            </a>
          </>
        ) : (
          <Button
            variant="success"
            className="btn-upload"
            onClick={(e) => {
              getTargetAlumni(e);
              setTimeout(() => {
                $('.pictureModal').css('display', 'block');
              }, 0);
            }}
          >
            上傳
          </Button>
        )}
      </td>
      <td className="buttonGroup">
        <Button
          variant="primary"
          className="btn-edit"
          onClick={(e) => {
            getTargetAlumni(e);
            setTimeout(() => {
              $('.dataModal').css('display', 'block');
            }, 0);
          }}
        >
          <img src={icon_edit} alt="icon_edit" />
        </Button>
        <Button
          variant="danger"
          className="btn-delete"
          onClick={(e) => {
            triggerWarningModal(e);
          }}
        >
          <img src={icon_x} alt="icon_x" />
        </Button>
        <Button
          variant="success"
          className="btn-update"
          onClick={(e) => {
            updateArticle(e);
          }}
        >
          <img src={icon_upload} alt="icon_upload" />
        </Button>
        <Button
          variant="danger"
          className="btn-cancel"
          onClick={(e) => {
            endEdit(e);
          }}
        >
          <img src={icon_x_circle} alt="icon_x_circle" />
        </Button>
      </td>
    </tr>
  );
  const PaginationComponent = () => (
    <Pagination>
      <Pagination.First
        onClick={() => {
          switchPage('first');
        }}
      />
      <Pagination.Prev
        onClick={() => {
          switchPage('prev');
        }}
      />
      {Array.from(Array(totalPage), (e, i) => {
        return (
          <Pagination.Item
            key={i}
            onClick={() => {
              switchPage('certainPage', i + 1);
            }}
            active={nowPage === i + 1 ? true : false}
          >
            {i + 1}
          </Pagination.Item>
        );
      })}
      {/* <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item> */}
      <Pagination.Next
        onClick={() => {
          switchPage('next');
        }}
      />
      <Pagination.Last
        onClick={() => {
          switchPage('last');
        }}
      />
    </Pagination>
  );

  // Utilities

  const getTargetAlumni = (e) => {
    let jobTitle,
      title = null;
    let targetArticleData = e.target.parentNode.parentNode.dataset;
    e.target.parentNode.parentNode.childNodes.forEach((child) => {
      if (child.classList[0] === 'jobTitleContent') {
        jobTitle = child.innerText;
      }
      if (child.classList[0] === 'titleContent') {
        title = child.innerText;
      }
    });

    setTargetArticle({
      name: targetArticleData.name,
      number: targetArticleData.number,
      jobTitle: jobTitle,
      title: title,
      content: targetArticleData.content,
      avatar: targetArticleData.avatar,
    });
  };
  const clearTargetAlumni = () => {
    setTargetArticle({
      name: '',
      number: '',
      jobTitle: '',
      title: '',
      content: '',
      avatar: '',
    });
  };
  const startEdit = (e) => {
    e.target.parentNode.parentNode.childNodes.forEach((child) => {
      if (child.classList[1] === 'data') {
        child.classList.add('editable');
        child.setAttribute('contentEditable', true);
      }
      if (child.classList[0] === 'buttonGroup') {
        child.childNodes.forEach((btn) => {
          if (
            btn.classList[0] === 'btn-edit' ||
            btn.classList[0] === 'btn-delete'
          ) {
            btn.style.display = 'none';
          } else {
            btn.style.display = 'inline';
          }
        });
      }
    });
    // if (isSthEditing === false) {
    //   e.target.parentNode.parentNode.childNodes.forEach((child) => {
    //     if (child.classList[1] === 'data') {
    //       child.classList.add('editable');
    //       child.setAttribute('contentEditable', true);
    //     }
    //     if (child.classList[0] === 'buttonGroup') {
    //       console.log('buttonGroup');
    //       child.childNodes.forEach((btn) => {
    //         if (
    //           btn.classList[0] === 'btn-edit' ||
    //           btn.classList[0] === 'btn-delete'
    //         ) {
    //           btn.style.display = 'none';
    //         } else {
    //           btn.style.display = 'inline';
    //         }
    //       });
    //     }
    //   });
    // } else {
    //   setToastContent(
    //     `尚有 Alumni 資料正在編輯中，請先結束該筆資料的編輯再進行下一步`
    //   );
    //   setTimeout(() => {
    //     triggerToast('warning');
    //   }, 0);
    // }
  };
  const endEdit = (e) => {
    e.target.parentNode.parentNode.childNodes.forEach((child) => {
      if (child.classList[1] === 'data') {
        child.classList.remove('editable');
        child.setAttribute('contentEditable', false);
      }
      if (child.classList[0] === 'buttonGroup') {
        child.childNodes.forEach((btn) => {
          if (
            btn.classList[0] === 'btn-edit' ||
            btn.classList[0] === 'btn-delete'
          ) {
            btn.style.display = 'inline';
          } else {
            btn.style.display = 'none';
          }
        });
      }
    });
    //setIsSthEditing(false);
  };
  const triggerWarningModal = (e) => {
    let name = '';
    let number = '';
    e.target.parentNode.parentNode.childNodes.forEach((child) => {
      if (child.classList[0] === 'nameContent') name = child.innerText;
      if (child.classList[0] === 'numberContent') number = child.innerText;
    });
    setModalContent(`你確定要刪除 ${numberToRank(number)} ${name} 的資料？`);
    setTimeout(() => {
      $('.warningModal').css('display', 'block');
    }, 20);
  };
  const triggerToast = (type) => {
    if (type == 'success') {
      $('.toastComponent.success').addClass('toastTrigger');
      setTimeout(() => {
        $('.toastComponent').removeClass('toastTrigger');
      }, 1500);
    }
    if (type == 'warning')
      $('.toastComponent.warning').addClass('toastTrigger');
  };
  const closeToast = () => {
    $('.toastComponent').addClass('toastTrigger');
  };
  const updateAvatar = () => {
    // TODO: avatar update api
    console.log('call avatar update api');
    // if update success
    setToastContent(
      `成功更新 ${numberToRank(targetArticle.number)} ${
        targetArticle.name
      } 的照片`
    );
    $('.modal').css('display', 'none');
    setTimeout(() => {
      triggerToast('success');
    }, 0);

    // TODO: if update fail, show what's wrong
    $('.modal').css('display', 'none');
  };
  // TODO: delete and update api call to be add
  const deleteArticle = (target) => {
    setToastContent(
      `成功刪除 ${numberToRank(target.number)} ${target.name} 的資料`
    );
    setTimeout(() => {
      triggerToast('success');
    }, 0);

    // TODO: if update fail, show what's wrong
    // setToastContent(`刪除 ${number} ${name} 的資料失敗，`);
    // triggerToast('warning');
  };
  const updateArticle = (e) => {
    let name = '';
    let number = '';
    e.target.parentNode.parentNode.childNodes.forEach((child) => {
      if (child.classList[0] === 'nameContent') name = child.innerText;
      if (child.classList[0] === 'numberContent') number = child.innerText;
    });
    // if update success
    setToastContent(`成功更新 ${numberToRank(number)} ${name} 的資料`);
    setTimeout(() => {
      triggerToast('success');
    }, 0);

    // TODO: if update fail, show what's wrong
    // setToastContent(`更新 ${number} ${name} 的資料失敗，`);
    // triggerToast('warning');
    endEdit(e);
  };
  const addArticle = () => {};

  const switchPage = (certainPage) => {
    document.getElementById('settingPageSection').scrollIntoView();
    setNowPage(certainPage);
  };

  return (
    <React.Fragment>
      <SuccessToast />
      <WarningToast />
      <WarningModal />
      <PictureUploadModal />
      <DataEditModal />
      <div className="titleSection">
        <h2 className="title">歷屆心得文資料庫</h2>
        <Button
          variant="primary"
          onClick={() => {
            clearTargetAlumni();
            setTimeout(() => {
              $('.dataModal').css('display', 'block');
            }, 0);
          }}
        >
          新增心得文
        </Button>
      </div>
      <Table bordered>
        <thead>
          <tr>
            <th>姓名</th>
            <th>屆數</th>

            <th>心得標題</th>
            <th>心得內容</th>
            <th>照片</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {articleData?.map((article, i) => {
            if ((nowPage - 1) * 10 <= i && i < nowPage * 10) {
              return (
                <ArticleRow
                  key={i}
                  name={article.alumni.name}
                  number={article.alumni.number}
                  // jobTitle={article.jobTitle}
                  title={article.title}
                  content={article.content.replace(/(\r\n|\n|\r)/g, `\r\n`)}
                  avatar={article.avatar}
                />
              );
            } else {
              return;
            }
          })}
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel="›"
        onPageChange={(e) => {
          switchPage(e.selected + 1);
        }}
        pageRangeDisplayed={3}
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
    </React.Fragment>
  );
}

export default BackstageArticleTable;
