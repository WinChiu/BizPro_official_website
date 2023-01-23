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
import Backstage from './pages/Backstage';

/*
TODO:
- lazy loading
*/

function App() {
  //axios.defaults.baseURL = 'https://bizpro-official-website.herokuapp.com/';
  axios.defaults.baseURL = 'http://localhost:5000/';
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  window.addEventListener('load', setVh);
  window.addEventListener('resize', setVh);

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Routes>
        <Route exact path="/" element={<About />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/member_talk" element={<Article />} />
        <Route path="/members" element={<Member />} />
        <Route path="/backstage" element={<Backstage />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
