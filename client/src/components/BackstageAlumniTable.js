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
function BackstageAlumniTable() {
  const [memberData, setMemberData] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const [toastContent, setToastContent] = useState('');
  const [modalTitle, setModalTitle] = useState('資料刪除警告');
  const [modalContent, setModalContent] = useState('');
  const [targetAlumni, setTargetAlumni] = useState({
    name: '',
    number: '',
    avatar: '',
  });

  // Load Data
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get('http://localhost:5000/api/alumni/members')
        .then((res) => {
          setMemberData(res.data);

          setTotalPage(Math.ceil(res.data.length / 10));
        })
        .catch((error) => console.log(error));
    };
    fetchData();
    return;
  }, []);

  // Components
  const WarningToast = () => (
    <div className="toastComponent warning">
      <p>{toastContent ? toastContent : '無提示訊息'}</p>
      {/* <img src={cross} alt="toastClose" className="toastClose" /> */}
    </div>
  );
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
              deleteAlumni(targetAlumni);
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
              defaultValue={`${targetAlumni.avatar ? targetAlumni.avatar : ''}`}
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
  const AlumniRow = ({ name, number, title, major, exp, tags, avatar }) => (
    <tr data-name={name} data-number={number} data-avatar={avatar}>
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
        className="majorContent data"
      >
        {major[0] === 'Unknown' ? (
          <span className="noData">查無資料</span>
        ) : major.length !== 0 ? (
          major.map((data, i) => {
            if (i !== major.length - 1) {
              return data + '；';
            }
            return data;
          })
        ) : (
          <span className="noData">查無資料</span>
        )}
      </td>
      <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="expContent data"
      >
        {exp ? (
          exp.map((data, i) => {
            if (i !== exp.length - 1) {
              return data + '；';
            }
            return data;
          })
        ) : (
          <span className="noData">查無資料</span>
        )}
      </td>
      <td
        contentEditable="false"
        suppressContentEditableWarning="true"
        className="tagsContent data"
      >
        {tags.length !== 0 ? (
          tags.map((data, i) => {
            if (i !== tags.length - 1) {
              return data + '；';
            }
            return data;
          })
        ) : (
          <span className="noData">查無資料</span>
        )}
      </td>
      <td>
        {avatar ? (
          <>
            <Button
              variant="primary"
              className="btn-reupload"
              onClick={(e) => {
                getTargetAlumni(e.target);
                setTimeout(() => {
                  $('.pictureModal').css('display', 'block');
                }, 0);
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
              getTargetAlumni(e.target);
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
            startEdit(e.target);
          }}
        >
          <img
            src={icon_edit}
            alt="icon_edit"
            onClick={(e) => {
              startEdit(e.target.parentNode);
            }}
          />
        </Button>
        <Button
          variant="danger"
          className="btn-delete"
          onClick={(e) => {
            if (e.target.tagName === 'BUTTON') {
              triggerWarningModal(e.target);
              getTargetAlumni(e.target);
            } else {
              triggerWarningModal(e.target.parentNode);
              getTargetAlumni(e.target.parentNode);
            }
          }}
        >
          <img
            src={icon_x}
            alt="icon_x"
            onClick={(e) => {
              //startEdit(e.target.parentNode);
            }}
          />
        </Button>
        <Button
          variant="success"
          className="btn-update"
          onClick={(e) => {
            if (e.target.tagName === 'BUTTON') updateAlumni(e.target);
            else updateAlumni(e.target.parentNode);
            endEdit(e.target);
          }}
        >
          <img src={icon_upload} alt="icon_upload" />
        </Button>
        <Button
          variant="danger"
          className="btn-cancel"
          onClick={(e) => {
            if (e.target.tagName === 'BUTTON') endEdit(e.target);
            else endEdit(e.target.parentNode);
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
  const AddAlumniModal = () => {
    return (
      <div className="modal show dataModal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>
              <strong>新增 Alumni</strong>
            </Modal.Title>
          </Modal.Header>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addAlumni(e);
            }}
          >
            <Modal.Body>
              <div className="container container__row1">
                <label>
                  姓名<span className="requiredDot">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="姓名"
                  className="nameInput"
                  required
                />
                <label>
                  屆數<span className="requiredDot">*</span>
                </label>
                <input
                  type="number"
                  name="number"
                  placeholder="屆數"
                  className="numberInput"
                  required
                />
              </div>
              <div className="container container__row2">
                <label>
                  頭銜<span className="requiredDot">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="頭銜"
                  className="titleInput"
                  required
                />
              </div>
              <div className="container container__row3">
                <label>
                  學歷<span className="requiredDot">*</span>
                </label>
                <input
                  type="text"
                  name="major"
                  placeholder="學歷（使用；隔開）"
                  className="majorInput"
                  required
                />
              </div>
              <div className="container container__row4">
                <label>
                  經歷<span className="requiredDot">*</span>
                </label>
                <input
                  type="text"
                  name="exp"
                  placeholder="經歷（使用；隔開）"
                  className="expInput"
                  required
                />
              </div>
              <div className="container container__row5">
                <label>
                  產業<span className="requiredDot">*</span>
                </label>
                <input
                  type="text"
                  name="tag"
                  placeholder="產業標籤（使用；隔開）"
                  className="tagInput"
                  required
                />
              </div>
              <div className="container container__row6">
                <label>
                  照片<span className="requiredDot">*</span>
                </label>
                <input
                  type="text"
                  name="avatar"
                  placeholder="照片連結"
                  className="avatarInput"
                  required
                />
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
                // onClick={() => {
                //   updateAvatar();
                // }}
              >
                新增
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Dialog>
      </div>
    );
  };

  const getTargetAlumni = (e) => {
    let targetAlumniData = e.parentNode.parentNode.dataset;
    setTargetAlumni({
      name: targetAlumniData.name,
      number: targetAlumniData.number,
      avatar: targetAlumniData.avatar,
    });
  };
  const startEdit = (e) => {
    e.parentNode.parentNode.childNodes.forEach((child) => {
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
    e.parentNode.parentNode.childNodes.forEach((child) => {
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
    e.parentNode.parentNode.childNodes.forEach((child) => {
      console.log(child);
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
    setTimeout(() => {
      $('.toastComponent').removeClass('toastTrigger');
    }, 1500);
  };
  const closeToast = () => {
    $('.toastComponent').addClass('toastTrigger');
  };
  const updateAvatar = async (e) => {
    // TODO: avatar update api
    await axios
      .put('http://localhost:5000/api/admin/update', {})
      .then()
      .catch((err) => {});

    // if update success
    setToastContent(
      `成功更新 ${numberToRank(targetAlumni.number)} ${
        targetAlumni.name
      } 的照片`
    );
    $('.modal').css('display', 'none');
    setTimeout(() => {
      triggerToast('success');
    }, 0);

    // TODO: if update fail, show what's wrong

    $('.modal').css('display', 'none');
  };

  const refreshAlumniData = async () => {
    await axios
      .get('http://localhost:5000/api/alumni/members')
      .then((res) => {
        setMemberData(res.data);
        setTotalPage(Math.ceil(res.data.length / 10));
      })
      .catch((error) => console.log(error));
  };
  // TODO: delete and update api call to be add
  const deleteAlumni = async (target) => {
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
  const updateAlumni = (e) => {
    console.log(e);
    let name = '';
    let number = '';
    e.parentNode.parentNode.childNodes.forEach((child) => {
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
  const addAlumni = async (e) => {
    await axios
      .post('http://localhost:5000/api/admin/add_alumni', {
        name: e.target.name.value,
        number: e.target.number.value,
        jobTitle: e.target.title.value,
        exp: e.target.exp.value.split('；'),
        tags: e.target.tag.value.split('；'),
        avatar: e.target.avatar.value,
        major: e.target.major.value.split('；'),
      })
      .then((res) => {
        setToastContent(
          `成功新增${numberToRank(e.target.number.value)} ${
            e.target.name.value
          }`
        );
        setTimeout(() => {
          triggerToast('success');
          // $('.dataModal').css('display', 'none');
        }, 0);
      })
      .catch((err) => {
        console.log(err.response.data.errors[0].msg);
        setToastContent('已存在相同屆數與姓名的 Alumni');
        setTimeout(() => {
          triggerToast('warning');
        }, 0);
      });
  };
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
      <AddAlumniModal />
      <div className="titleSection">
        <h2 className="title">Alumni 資料庫</h2>
        <Button
          variant="primary"
          onClick={() => {
            $('.dataModal').css('display', 'block');
          }}
        >
          新增 Alumni
        </Button>
      </div>
      <Table bordered>
        <thead>
          <tr>
            <th>姓名</th>
            <th>屆數</th>
            <th>頭銜</th>
            <th>學歷</th>
            <th>經歷（使用；隔開）</th>
            <th>產業標籤（使用；隔開）</th>
            <th>照片</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {memberData?.map((member, i) => {
            if ((nowPage - 1) * 10 <= i && i < nowPage * 10) {
              return (
                <AlumniRow
                  key={i}
                  name={member.name}
                  number={member.number}
                  title={member.jobTitle}
                  major={member.major}
                  exp={member.exp}
                  tags={member.tags}
                  avatar={member.avatar}
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

export default BackstageAlumniTable;
