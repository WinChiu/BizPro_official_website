import React, { lazy } from 'react';
import './css/style.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import NavBarMin from './components/NavBarMin';
import Activity from './pages/Activity';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Activity />
      <Footer />
    </React.Fragment>
  );
}

export default App;
