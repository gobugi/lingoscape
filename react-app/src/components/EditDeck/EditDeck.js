import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./EditDeck.css";

const EditDeck = () => {

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

    if (!currentQuestion) {
      setCurrentQuestion(currentCard?.question)
    }

    if (!currentAnswer) {
      setCurrentAnswer(currentCard?.answer)
    }


    const editCard = {

      "question": currentQuestion,
      "answer": currentAnswer
    }


    /////////////////////MAKE THIS CARD ID DYNAMIC///////////////////////////
    const cardData = await fetch(`/api/cards/${currentCard?.id}`, {
      method: 'PATCH',
      body: JSON.stringify(editCard),
      headers: {
            "Content-Type": "application/json"
          }
      })
    const data = await cardData.json()

    history.go(0);

    return data
  }



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


const addCard = async (e) => {
  e.preventDefault()

  const newCard = {
    deckId,
    "question": currentQuestion,
    "answer": currentAnswer
  }


  const response = await fetch(`/api/cards`, {
    method: 'POST',
    body: JSON.stringify(newCard),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();

  // const cardsUL = document.getElementById("createdCardsList");
  // const cardsLi = document.createElement("li");
  // const cardsSpan1 = document.createElement("span");
  // const cardsSpan2 = document.createElement("span");

  // cardsUL.appendChild(cardsLi);

  // cardsLi.appendChild(cardsSpan1);
  // cardsLi.appendChild(cardsSpan2);

  // cardsSpan1.innerHTML = question;
  // cardsSpan2.innerHTML = answer;

  // const cardsTextInput = document.getElementsByClassName("cardInput");
  // cardsTextInput.value = '';
  // cardsTextInput.placeholder = '';

  setCurrentQuestion('');
  setCurrentAnswer('')

  // document.getElementById("done-btn").style.display="block";

  history.go(0);

  return data
}


  return (
    <main id="main-dashboard">
      <h2>{currentTitle && currentTitle}</h2>
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

        {(currentDeck?.authorId === userId) && myOrderedCards?.map(card => (
          <li>
            <form id="edit-card" onSubmit={updateCard}>
              <input
                className='textInput'
                type="text"
                defaultValue={card?.question}
                onChange={(e) => ( setCurrentCard(card), setCurrentQuestion(e.target.value) )}
              />

              <input
                className='textInput'
                type="text"
                defaultValue={card?.answer}
                onChange={(e) => ( setCurrentCard(card), setCurrentAnswer(e.target.value) )}
              />
              <button>Edit</button>
              {/* <button type="button">Delete</button> */}
            </form>
          </li>
        ))}

      </ul>

      {(currentDeck?.authorId === userId) &&
      <ul>
        <li>
          <form id="addCardForm" onSubmit={addCard} >
            <div className='createCard'>
              {/* <label className='createCardQuestion'>{langArr[languageId - 1]}: </label> */}
              <input
                className='textInput cardInput'
                type="text"
                // value=""
                onChange={(e) => setCurrentQuestion(e.target.value)}
                placeholder='Ex: Bonjour'
              />
            </div>
            <div className='createCard'>
              {/* <label className='createCardAnswer'>English: </label> */}
              <input
                className='textInput cardInput'
                type="text"
                // value=""
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder='Ex: Hello'
              />
            </div>
            <button className='create-card-btn'>Add Card</button>
          </form>
        </li>
      </ul>
      }

      {(currentDeck?.authorId === userId) &&
        <div>
          <button onClick={deleteDeck}>Delete Deck</button>
          <NavLink to={`/decks/${deckId}`}>
            <button>Done</button>
          </NavLink>
        </div>
      }

    </main>
  )

}
export default EditDeck;