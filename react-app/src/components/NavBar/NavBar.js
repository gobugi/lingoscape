
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <div className="logo-container">
        <NavLink to='/'>
          <img alt='logo' className="lingoscape-logo" src="logo.png"/>
        </NavLink>
        <NavLink id="nav-lingoscape" to='/decks/new'>
          &nbsp;&nbsp;&nbsp;<span>Lingoscape</span>
        </NavLink>
      </div>
      <div className="navbar-items-container">
        <NavLink id="nav-find-flashcards" to='/languages'>
          <div>
            <i class="fas fa-search"></i>
            &nbsp;<span>Find Flashcards</span>&nbsp;&nbsp;
            <i class="fas fa-caret-down"></i>
          </div>
        </NavLink>
        <NavLink id="nav-make-flashcards" to='/decks/new'>
          <div>
            <span>Make Flashcards</span>
          </div>
        </NavLink>
        <NavLink id="nav-login" to='/login'>
          <div>
            <span>Log In</span>
          </div>
        </NavLink>
        <NavLink id="nav-signup" to='/sign-up' exact={true} activeClassName='active'>
          <div>
            <span>Get Started</span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
