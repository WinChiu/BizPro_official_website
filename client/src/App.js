import React, { lazy } from 'react';
import './css/style.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Activity from './pages/Activity';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Journey from './pages/Journey';
import Article from './pages/Article';
import Member from './pages/Member';
import $ from 'jquery';
import axios from 'axios';
function App() {
  axios.defaults.baseURL = 'https://bizpro-official-website.herokuapp.com/';

  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  window.addEventListener('load', setVh);
  window.addEventListener('resize', setVh);

  // function wheel(event) {
  //   var delta = 0;
  //   if (event.wheelDelta) {
  //     delta = event.wheelDelta / 120;
  //   } else if (event.detail) {
  //     delta = -event.detail / 3;
  //   }

  //   handle(delta);
  //   if (event.preventDefault) {
  //     event.preventDefault();
  //   }
  //   event.returnValue = false;
  // }
  // function handle(delta) {
  //   var time = 1000;
  //   var distance = 300;

  //   $('html, body')
  //     .stop()
  //     .animate(
  //       {
  //         scrollTop: $(window).scrollTop() - distance * delta,
  //       },
  //       time
  //     );
  // }

  // if (window.addEventListener) {
  //   window.addEventListener('DOMMouseScroll', wheel, false);
  // }
  // window.onmousewheel = document.onmousewheel = wheel;

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<About />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/member_talk" element={<Article />} />
        <Route path="/members" element={<Member />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
