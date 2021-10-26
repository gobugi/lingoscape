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
	const [currentCard, setCurrentCard] = useState([]);


  useEffect(() => {
    async function my_deck() {
			const response = await fetch(`/api/decks/${deckId}`);
			const responseData = await response.json();
			setCurrentDeck(responseData?.deck[0]);
      setCurrentTitle(responseData?.deck[0]?.title)
		}
    my_deck();
	}, []);



  const deleteDeck = async (e) => {
    e.preventDefault();
    await fetch(`/api/decks/delete/${deckId}`, {
        method: 'DELETE'
    })
    history.push("/dashboard");
  };


  const myCards = currentDeck?.cards;

  const myOrderedCards = myCards?.sort(function(a, b) {
    return a?.id - b?.id;
  });


  return (
    <main id="main-deck">
      <div>
        <h2>{currentTitle && currentTitle}</h2>

        {currentDeck && myOrderedCards?.map(card => (
          <div>
            <div>
              <span id="span-left">{card?.question}</span>
              <span id="span-center">{` | `}</span>
              <span id="span-right">{card?.answer}</span>
            </div>
          </div>
        ))}

        {(currentDeck?.authorId === userId) &&
        <div>
          <NavLink to={`/decks/edit/${deckId}`}>
            <button>Edit</button>
          </NavLink>

          <button onClick={deleteDeck}>Delete</button>
        </div>
        }
      </div>
    </main>
  )

}
export default SingleDeck;
