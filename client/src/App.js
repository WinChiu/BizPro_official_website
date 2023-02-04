import React from 'react';
import './css/style.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Journey from './pages/Journey';
import Article from './pages/Article';
import Member from './pages/Member';
import Backstage from './pages/Backstage';
import $ from 'jquery';
import axios from 'axios';
import LogoLoading from './components/LogoLoading';

// const About = lazy(() => import('./pages/About'));
// const Journey = lazy(() => import('./pages/Journey'));
// const Article = lazy(() => import('./pages/Article'));
// const Member = lazy(() => import('./pages/Member'));
// const Backstage = lazy(() => import('./pages/Backstage'));
/*
TODO:
- lazy loading
*/

function App() {
  // axios.defaults.baseURL = 'http://localhost:5000/';
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  window.addEventListener('load', setVh);
  window.addEventListener('resize', setVh);

  window.onload = () => {
    let nowLocation = window.location.href;
    if (nowLocation[nowLocation.length - 1] === '/') {
      $('.logoContainer').css('animation-iteration-count', '1');
      setTimeout(() => {
        $('.logoContainer').css('width', '200px');
        setTimeout(() => {
          $('.logoLoading').fadeOut();
        }, 1200);
      }, 1200);
    } else {
      $('.logoLoading').fadeOut();
      $('body').css('overflow-y', 'scroll');
    }
  };
  return (
    <BrowserRouter>
      <NavBar />
      <LogoLoading />
      <Routes>
        <Route exact path="/" element={<About />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/member_talk" element={<Article />} />
        <Route path="/members" element={<Member />} />
        <Route path="/backstage" element={<Backstage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
