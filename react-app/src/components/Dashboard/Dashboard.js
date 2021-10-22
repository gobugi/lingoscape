import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Dashboard.css";
import LogoutButton from '../auth/LogoutButton';

const Dashboard = () => {

	const sessionUser = useSelector((state) => state?.session?.user);
	const userId = sessionUser?.id;

  return (
    <main id="main-dashboard">
      <h1>You are logged in</h1>
      <LogoutButton />
    </main>
  )

}
export default Dashboard;
