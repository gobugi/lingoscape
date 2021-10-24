import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Dashboard.css";

const Dashboard = () => {

	const sessionUser = useSelector((state) => state?.session?.user);
	const userId = sessionUser?.id;

  const [errors, setErrors] = useState([]);
	const [allDecks, setAllDecks] = useState([]);
	const [myDecks, setMyDecks] = useState([]);




  useEffect(() => {
    async function my_deck() {
			const response = await fetch(`/api/decks/`);
			const responseData = await response.json();
			setAllDecks(responseData?.decks);

      const myDecksArr = [];
      responseData?.decks?.forEach(deck => {
        userId === deck?.authorId && myDecksArr?.push(deck)
      })
      setMyDecks(myDecksArr)


		}
    my_deck();
	}, []);


  return (
    <main id="main-dashboard">
      <h1>My Decks</h1>
      <ul>
        {myDecks && myDecks?.map(deck => (
          <li>
            <NavLink to={`/decks/${deck?.id}`}>{deck?.title}</NavLink>
          </li>
        ))}
      </ul>
    </main>
  )

}
export default Dashboard;
