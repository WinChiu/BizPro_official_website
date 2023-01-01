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
function App() {
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  window.addEventListener('load', setVh);
  window.addEventListener('resize', setVh);
  window.$ = window.jQuery = require('jquery');

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
