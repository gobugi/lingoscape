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

        <ul>
        {currentDeck && myOrderedCards?.map(card => (
          <li>
            <div className="card-display">
              <div className="QAdiv">
                <span>{card?.question}</span>
              </div>
              <div className="QAdiv">
                <span>
                  {card?.answer}
                </span>
              </div>
            </div>
          </li>
        ))}
        </ul>
        {(currentDeck?.authorId === userId) &&
        <div>
          <button onClick={deleteDeck}>Delete Deck</button>

          <NavLink to={`/decks/edit/${deckId}`}>
            <button>Edit</button>
          </NavLink>
        </div>
        }
      </div>
      <NavLink id="study-btn" to={`/decks/study/${deckId}`}>
        <div>
          <span>Start</span>
          <span id="divider-span">{` | `}</span>
          <i class="fas fa-book-reader"></i>
        </div>
      </NavLink>
    </main>
  )

}
export default SingleDeck;
