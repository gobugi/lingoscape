import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SingleDeck.css";

const SingleDeck = () => {

  const history = useHistory();

	const sessionUser = useSelector((state) => state?.session?.user);
	const userId = sessionUser?.id;

  const location = useLocation();
  const deckId = +(window.location?.pathname?.split('/').pop(-1));


  const [errors, setErrors] = useState([]);
	const [currentDeck, setCurrentDeck] = useState([]);
	const [currentTitle, setCurrentTitle] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState([]);
	const [currentAnswer, setCurrentAnswer] = useState([]);


  useEffect(() => {
    async function my_deck() {
			const response = await fetch(`/api/decks/${deckId}`);
			const responseData = await response.json();
			setCurrentDeck(responseData?.deck[0]);
      setCurrentTitle(responseData?.deck[0]?.title)
		}
    my_deck();
	}, []);


  const renameDeck = async (e) => {
    e.preventDefault()

    const editDeck = {
      "title": currentTitle
    }

    const deckData = await fetch(`/api/decks/${deckId}`, {
      method: 'PATCH',
      body: JSON.stringify(editDeck),
      headers: {
            "Content-Type": "application/json"
          }
      })
      const data = await deckData.json()

    return data
  }



  const updateCard = async (e) => {
    e.preventDefault()

    const editCard = {
      "question": currentQuestion,
      "answer": currentAnswer
    }

    /////////////////////MAKE THIS CARD ID DYNAMIC///////////////////////////
    const cardData = await fetch(`/api/cards/60`, {
      method: 'PATCH',
      body: JSON.stringify(editCard),
      headers: {
            "Content-Type": "application/json"
          }
      })
      const data = await cardData.json()

    return data
  }



  const deleteDeck = async (e) => {
    e.preventDefault();
    await fetch(`/api/decks/delete/${deckId}`, {
        method: 'DELETE'
    })
    history.push("/dashboard");
};





  return (
    <main id="main-dashboard">
      <h2>Welcome</h2>
      <h1>Deck: {currentTitle && currentTitle}</h1>
      { currentDeck?.authorId === userId && <form id="edit-title" onSubmit={renameDeck}>
        <input
          className='textInput'
          type="text"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          placeholder='New Name'
        />
        <button>Rename</button>
      </form> }
      <ul>

        {(currentDeck?.authorId !== userId) && currentDeck?.cards?.map(card => (
          <li>
            <div>{card?.question}</div>
            <div>{card?.answer}</div>
          </li>
        ))}

        {(currentDeck?.authorId === userId) && currentDeck?.cards?.map(card => (
          <li>
            <div>{card?.question}</div>

            <form id="edit-card" onSubmit={updateCard}>
              <input
                className='textInput'
                type="text"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
              />
              <div>{card?.answer}</div>
              <input
                className='textInput'
                type="text"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
              />
              <button>Edit</button>
            </form>
          </li>
        ))}

      </ul>

      {(currentDeck?.authorId === userId) &&
        <button onClick={deleteDeck} >Delete Deck</button>
      }

    </main>
  )

}
export default SingleDeck;
