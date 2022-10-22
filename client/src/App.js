import React, { lazy } from 'react';
import './css/style.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import NavBarMin from './components/NavBarMin';
import Activity from './pages/Activity';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* <Route exact path="/" element={<></>} /> */}
        <Route path="/activity" element={<Activity />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
