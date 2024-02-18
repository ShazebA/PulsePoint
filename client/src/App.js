
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';
import history from './history';

import Nav from './components/Nav';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './PrivateRoute';

import './static/css/globals.css';
import './static/css/navbar.css';
import './static/css/landing.css';

function App() {

  return (
    <Router history={history}>
      <Nav />
      <Routes>
        <Route exact index element={<Landing />}/>
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
