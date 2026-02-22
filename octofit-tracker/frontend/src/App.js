import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function NavBar() {
  const linkClass = ({ isActive }) =>
    'nav-link' + (isActive ? ' active fw-semibold' : '');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">OctoFit Tracker</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMain"
          aria-controls="navMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navMain" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink to="/" end className={linkClass}>Activities</NavLink></li>
            <li className="nav-item"><NavLink to="/workouts" className={linkClass}>Workouts</NavLink></li>
            <li className="nav-item"><NavLink to="/leaderboard" className={linkClass}>Leaderboard</NavLink></li>
            <li className="nav-item"><NavLink to="/teams" className={linkClass}>Teams</NavLink></li>
            <li className="nav-item"><NavLink to="/users" className={linkClass}>Users</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <>
      <NavBar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </>
  );
}