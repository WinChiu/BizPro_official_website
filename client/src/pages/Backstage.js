import React, { useState, useEffect } from 'react';
import backstage_logo from '../asset/img/backstage_logo.svg';
import icon_alumniData from '../asset/img/icon/icon_alumniData.svg';
import icon_alumniTalk from '../asset/img/icon/icon_alumniTalk.svg';
import BackstageAlumniTable from '../components/BackstageAlumniTable';
import BackstageArticleTable from '../components/BackstageArticleTable';
import $ from 'jquery';
function Backstage() {
  const [nowTab, setNowTab] = useState('alumni');

  const Tab = ({ icon, title, tabName }) => (
    <div
      className="sideBarTab"
      onClick={() => {
        setNowTab(tabName);
      }}
    >
      <img src={icon} alt="icon" className="tab--icon" />
      <p className="tab--title">{title}</p>
    </div>
  );
  return (
    <section className="backstage">
      <section className="sidebar">
        <img
          src={backstage_logo}
          alt="backstage_logo"
          className="backstage_logo"
        />
        <div className="tabContainer">
          <Tab
            icon={icon_alumniData}
            title={'Alumni 資料庫'}
            tabName={'alumni'}
          />
          <div className="line" />
          <Tab
            icon={icon_alumniTalk}
            title={'歷屆心得文'}
            tabName={'article'}
          />
        </div>
        <p className="sign">Built by 22nd Win & 21st Jim</p>
      </section>
      <section className="settingPage" id="settingPageSection">
        {nowTab === 'alumni' ? (
          <BackstageAlumniTable />
        ) : (
          <BackstageArticleTable />
        )}
      </section>
    </section>
  );
}

export default Backstage;
