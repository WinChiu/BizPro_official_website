import React, { useEffect, useState } from 'react';
import backstage_logo from '../asset/img/backstage_logo.svg';
import icon_alumniData from '../asset/img/icon/icon_alumniData.svg';
import icon_alumniTalk from '../asset/img/icon/icon_alumniTalk.svg';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import cross from '../asset/img/icon/icon_crossWhite.svg';
import Modal from 'react-bootstrap/Modal';
import $ from 'jquery';
import numberToRank from '../utility/numberToRank';
function Backstage() {
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

  const [isSthEditing, setIsSthEditing] = useState(false);

  // Components
  const Tab = ({ icon, title }) => (
    <div className="sideBarTab">
      <img src={icon} alt="icon" className="tab--icon" />
      <p className="tab--title">{title}</p>
    </div>
  );
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
        {major ? major : <span className="noData">查無資料</span>}
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
        {tags === [''] ? (
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
                getTargetAlumni(e);
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
            startEdit(e);
          }}
        >
          編輯
        </Button>
        <Button
          variant="danger"
          className="btn-delete"
          onClick={(e) => {
            triggerWarningModal(e);
          }}
        >
          刪除
        </Button>
        <Button
          variant="success"
          className="btn-update"
          onClick={(e) => {
            updateAlumni(e);
          }}
        >
          更新
        </Button>
        <Button
          variant="danger"
          className="btn-cancel"
          onClick={(e) => {
            endEdit(e);
          }}
        >
          取消
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
    let targetAlumniData = e.target.parentNode.parentNode.dataset;
    setTargetAlumni({
      name: targetAlumniData.name,
      number: targetAlumniData.number,
      avatar: targetAlumniData.avatar,
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
  // TODO: delete and update api call to be add
  const deleteAlumni = (target) => {
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
  const addAlumni = () => {};

  const switchPage = (direction, certainPage) => {
    switch (direction) {
      case 'next':
        if (nowPage < totalPage) {
          document.getElementById('settingPageSection').scrollIntoView();
          setNowPage(nowPage + 1);
        }
        break;
      case 'prev':
        if (nowPage > 1) {
          document.getElementById('settingPageSection').scrollIntoView();
          setNowPage(nowPage - 1);
        }
        break;
      case 'last':
        document.getElementById('settingPageSection').scrollIntoView();
        setNowPage(totalPage);
        break;
      case 'first':
        document.getElementById('settingPageSection').scrollIntoView();
        setNowPage(1);
        break;
      case 'certainPage':
        document.getElementById('settingPageSection').scrollIntoView();
        setNowPage(certainPage);
        break;
      default:
        break;
    }
  };
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
  return (
    <section className="backstage">
      <section className="sidebar">
        <img
          src={backstage_logo}
          alt="backstage_logo"
          className="backstage_logo"
        />
        <div className="tabContainer">
          <Tab icon={icon_alumniData} title={'Alumni 資料庫'} />
          <div className="line" />
          <Tab icon={icon_alumniTalk} title={'歷屆心得文'} />
        </div>
        <p className="sign">Built by Win & Jim</p>
      </section>
      <section className="settingPage" id="settingPageSection">
        <SuccessToast />
        <WarningToast />
        <WarningModal />
        <PictureUploadModal />
        <div className="titleSection">
          <h2 className="title">Alumni 資料庫</h2>
          <Button variant="primary">新增 Alumni</Button>
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
        <PaginationComponent />
      </section>
    </section>
  );
}

export default Backstage;
