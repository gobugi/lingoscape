import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useHistory, Redirect } from "react-router-dom";
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


  //////////////////////////////////////////////////////////////

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

      setCurrentDeck({...data})

      document.getElementById("edit-title").style.display="none";
      document.getElementById("revealTitleBtn").style.display="block";

    return currentDeck
  }

  const revealTitleForm = async (e) => {
    e.preventDefault()

    document.getElementById("edit-title").style.display="block";
    document.getElementById("revealTitleBtn").style.display="none";
  }

///////////////////////////////////////////////////////////////////////////////

  const updateCard = async (e) => {
    e.preventDefault()

    const editCard =
    {
      "question": currentQuestion,
      "answer": currentAnswer,
    }

    const cardData = await fetch(`/api/cards/${currentCard?.id}`, {
      method: 'PATCH',
      body: JSON.stringify(editCard),
      headers: {
            "Content-Type": "application/json"
          }
      })
    const data = await cardData.json()

    setCurrentCard({});
    setCurrentQuestion('');
    setCurrentAnswer('');

    // history.go(0);

    return data
  }


///////////////////////////////////////////////////////////////////////


const deleteDeck = async (e) => {
  e.preventDefault();
  await fetch(`/api/decks/delete/${deckId}`, {
      method: 'DELETE'
  })
  history.push("/dashboard");
};

const deleteCard = (id) => async (e) => {
  e.preventDefault();
  await fetch(`/api/cards/delete/${id}`, {
      method: 'DELETE'
  })

  setCurrentCard({});
  setCurrentQuestion('');
  setCurrentAnswer('');

    history.go(0);

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

  setCurrentCard({});
  setCurrentQuestion('');
  setCurrentAnswer('');

  history.go(0)

  return data
}


  return (
    <main id="main-decks-edit">
      <div>

        <h2>{currentDeck && currentDeck?.title}</h2>
        { currentDeck?.authorId === userId &&
        <form id="edit-title" onSubmit={renameDeck} style={{display:"none"}}>
          <input
            className='textInput'
            type="text"
            defaultValue={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
          />
          <button>Rename</button>
        </form> }
        <button id="revealTitleBtn" style={{display:"block"}} onClick={revealTitleForm}>Rename</button>


        <ul>

          {(currentDeck?.authorId === userId) && myOrderedCards?.map(card => (
            <li>
              <form onSubmit={updateCard}>
                <input
                  id={`card-question-${card?.id}`}
                  className='textInput'
                  type="text"
                  defaultValue={card?.question}
                  placeholder={card?.question}
                  onChange={(e) => ( setCurrentCard(card), setCurrentQuestion(document.getElementById(`card-question-${card?.id}`).value), setCurrentAnswer(document.getElementById(`card-answer-${card?.id}`).value) )}
                />
                <input
                  id={`card-answer-${card?.id}`}
                  className='textInput'
                  type="text"
                  defaultValue={card?.answer}
                  placeholder={card?.answer}
                  onChange={(e) => ( setCurrentCard(card), setCurrentQuestion(document.getElementById(`card-question-${card?.id}`).value), setCurrentAnswer(document.getElementById(`card-answer-${card?.id}`).value) )}
                />
                <button>Save</button>
                <button type="button" onClick={deleteCard(card?.id)}>Delete</button>
              </form>
            </li>
          ))}

        </ul>

        {(currentDeck?.authorId === userId) &&
        <ul>
          <li>
            <form id="addCardForm" onSubmit={addCard} >
              <span className='createCard'>
                <input
                  className='textInput cardInput'
                  type="text"
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  placeholder='Ex: Bonjour'
                />
              </span>
              <span className='createCard'>
                <input
                  className='textInput cardInput'
                  type="text"
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder='Ex: Hello'
                />
              </span>
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
      </div>


    </main>
  )

}
export default EditDeck;
