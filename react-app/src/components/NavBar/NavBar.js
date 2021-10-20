
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css";

const NavBar = () => {
  return (


    // <nav>
    //   <ul>
    //     <li>
    //       <NavLink to='/' exact={true} activeClassName='active'>
    //         Home
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/login' exact={true} activeClassName='active'>
    //         Login
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/sign-up' exact={true} activeClassName='active'>
    //         Sign Up
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/users' exact={true} activeClassName='active'>
    //         Users
    //       </NavLink>
    //     </li>
    //     <li>
    //       <LogoutButton />
    //     </li>
    //   </ul>
    // </nav>



    <nav>
      <div className="logo-container">
        <NavLink to='/'>
          <img alt='logo' className="lingoscape-logo" src="logo.png"/>
        </NavLink>
        <NavLink id="nav-lingoscape" to='/'>
          &nbsp;&nbsp;&nbsp;<span>Lingoscape</span>
        </NavLink>
      </div>
      <div className="navbar-items-container">
        <div id="nav-btns">
          <div>
            <NavLink id="nav-find-flashcards" to='/languages'>
              <i className="fas fa-search"></i>
              &nbsp;<span>Find Flashcards</span>&nbsp;&nbsp;
              <i className="fas fa-caret-down"></i>
            </NavLink>
          </div>
          <div id="nav-separator" />
          <div>
            <NavLink id="nav-make-flashcards" to='/decks/new'>
                <span>Make Flashcards</span>
            </NavLink>
          </div>
        </div>
        <div id="log-btns">
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
      </div>
    </nav>
  );
}

export default NavBar;
