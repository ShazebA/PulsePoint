
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import history from './history';
import Dashboard from './pages/Dashboard';
import Nav from './components/Nav';
import LandingNav from './components/LandingNav';
import Landing from './pages/Landing';
import PrivateRoute from './PrivateRoute';
import Verify from './pages/Verify';

import './static/css/globals.css';
import './static/css/navbar.css';
import './static/css/landing.css';

function App() {
  
  return (
    <Router history={history}>
      <Routes>
        <Route exact index element={<Landing />}/>
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />}/>
          <Route path="verify" element={<Verify />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
