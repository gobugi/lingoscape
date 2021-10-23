import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Dashboard.css";

const Dashboard = () => {

	const sessionUser = useSelector((state) => state?.session?.user);
	const userId = sessionUser?.id;

  const [errors , setErrors] = useState([]);
	const [currentDeck, setCurrentDeck] = useState([]);
	const [currentTitle, setCurrentTitle] = useState([]);

  useEffect(() => {
    async function my_deck() {
			const response = await fetch('/api/decks/3');
			const responseData = await response.json();
			setCurrentDeck(responseData?.deck[0]);
      setCurrentTitle(responseData?.deck[0]?.title)
		}
    my_deck();
	}, []);


  const renameDeck = async (e) => {
    e.preventDefault()
    // setErrors([]);

    const editDeck = {
      "title": currentTitle,
      "languageId": currentDeck?.languageId,
      "authorId": userId
    }

    const deckData = await fetch(`/api/decks/edit/3`, {
      method: 'PATCH',
      body: JSON.stringify(editDeck),
      headers: {
            "Content-Type": "application/json"
          }
      })
      const data = await deckData.json()

    return data
  }


  return (
    <main id="main-dashboard">
      <h1>Welcome</h1>
      <form onSubmit={renameDeck}>
        <h1>Deck: {currentTitle && currentTitle}</h1>
        <input
          className='textInput'
          type="text"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          placeholder='New Name'
        />
        <button>Rename</button>
      </form>
      <ul>
        {currentDeck?.cards && currentDeck?.cards?.map(card => (
          <li>{card?.question}</li>
        ))}
      </ul>
    </main>
  )

}
export default Dashboard;
