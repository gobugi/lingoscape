
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css";

const NavBar = () => {


  const sessionUser = useSelector(state => state?.session?.user);

  if (sessionUser) {
    <div id="log-btns"></div>
  }

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
          <img alt='logo' className="lingoscape-logo" src="https://raw.githubusercontent.com/gobugi/lingoscape/main/react-app/public/logo.png"/>
        </NavLink>
        <NavLink id="nav-lingoscape" to='/'>
          &nbsp;&nbsp;&nbsp;<span>Lingoscape</span>
        </NavLink>
      </div>
      <div className="navbar-items-container">
        <div id="nav-btns">
          <div>
            <NavLink id="nav-find-flashcards" to='/decks'>
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
        {!sessionUser &&
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
        }
      </div>
    </nav>
  );
}

export default NavBar;
