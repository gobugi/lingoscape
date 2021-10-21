import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Dashboard.css";
import LogoutButton from '../auth/LogoutButton';

const Dashboard = () => {

  return (
    <main id="main-dashboard">
      <h1>You are logged in</h1>
      <LogoutButton />
    </main>
  )

}
export default Dashboard;
