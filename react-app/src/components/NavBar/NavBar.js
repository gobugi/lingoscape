import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css";

const NavBar = () => {

  const [showMenu, setShowMenu] = useState(false);

  const sessionUser = useSelector(state => state?.session?.user);
  const userId = sessionUser?.id;

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  return (
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

        {!sessionUser ?

          <div id="log-btns" className="profile-logout">
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

          :

          <div className="profile-logout">
          <i onClick={openMenu} className="fas fa-user-circle fa-3x"></i>
          {showMenu && (
            <div className="dropdown-div">
              <ul className="profile-dropdown" style={{listStyleType: 'none'}}>
                <li key={`userId-${userId}`}>{sessionUser.username}</li>
                <li key={`email-${sessionUser?.email}`}>{sessionUser.email}</li>
                <li key={`username-${sessionUser?.username}`}><LogoutButton /></li>
              </ul>
            </div>
          )}
        </div>

        }

      </div>
    </nav>
  );
}

export default NavBar;
