import $ from 'jquery';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogoLoading from './components/LogoLoading';
import PrivateRouteBackstage from './components/PrivateRouteBackstage';
import './css/style.css';
import About from './pages/About';
import Article from './pages/Article';
import Backstage from './pages/Backstage';
import Journey from './pages/Journey';
import Login from './pages/Login';
import Member from './pages/Member';
import useToken from './utility/useToken';
const nonce = process.env.SCRIPT_NONCE;
function App() {
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  // window.addEventListener('resize', setVh);
  // window.onload = () => {
  //   setVh();
  //   let nowLocation = window.location.href;
  //   if (nowLocation[nowLocation.length - 1] === '/') {
  //     $('.logoContainer').css('animation-iteration-count', '1');
  //     console.log('stop loading');
  //     setTimeout(() => {
  //       $('.logoContainer').css('width', '200px');
  //       console.log('show logo');

  //       setTimeout(() => {
  //         $('.logoLoading').fadeOut();
  //         console.log('fadeout 1');

  //         $('body').css('overflow-y', 'scroll');
  //       }, 1200);
  //     }, 1200);
  //   } else {
  //     $('.logoLoading').fadeOut();
  //     console.log('fadeout 2');

  //     $('body').css('overflow-y', 'scroll');
  //   }
  // };
  $(window).on('load', function () {
    setVh();
    let nowLocation = window.location.href;
    if (nowLocation[nowLocation.length - 1] === '/') {
      $('.logoContainer').css('animation-iteration-count', '1');
      console.log('stop loading');
      setTimeout(() => {
        $('.logoContainer').css('width', '200px');
        console.log('show logo');

        setTimeout(() => {
          $('.logoLoading').fadeOut();
          console.log('fadeout 1');

          $('body').css('overflow-y', 'scroll');
        }, 1200);
      }, 1200);
    } else {
      $('.logoLoading').fadeOut();
      console.log('fadeout 2');

      $('body').css('overflow-y', 'scroll');
    }
  });
  const { token, setToken } = useToken();
  return (
    <BrowserRouter>
      {/* <LogoLoading /> */}
      <Routes>
        <Route exact path="/" element={<About />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/articles" element={<Article />} />
        <Route path="/members" element={<Member />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/backstage"
          element={
            <PrivateRouteBackstage token={token} backstage={<Backstage />} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
