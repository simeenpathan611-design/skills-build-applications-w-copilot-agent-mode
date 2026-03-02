import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="container py-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">OctoFit</NavLink>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"><NavLink className="nav-link" to="/activities">Activities</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/teams">Teams</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/users">Users</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/workouts">Workouts</NavLink></li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<div><h1>Welcome to OctoFit Tracker</h1></div>} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
