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
	}, [currentCard, currentAnswer, currentQuestion]);


  //////////////////////////////////////////////////////////////

  const renameDeck = async (e) => {
    e.preventDefault()
    setErrors([]);

    const editDeck = {
      "title": currentTitle,
      "authorId": currentDeck?.authorId,
      "languageId": currentDeck?.languageId
    }

    const deckData = await fetch(`/api/decks/${deckId}`, {
      method: 'PATCH',
      body: JSON.stringify(editDeck),
      headers: {
            "Content-Type": "application/json"
          }
      })

      if (deckData.ok) {
        const data = await deckData.json();
        setCurrentDeck({...data})

        document.getElementById("edit-title").style.display="none";
        document.getElementById("revealTitleBtn").style.display="block";

        return data;
      } else if (deckData.status < 500) {
        const data = await deckData.json();
        if (data.errors) {
          setErrors(data.errors);

          return data;
        }
      } else {
          return ['An error occurred. Please try again.']
      }

    return currentDeck
  }

  const revealTitleForm = async (e) => {
    e.preventDefault()

    document.getElementById("edit-title").style.display="block";
    document.getElementById("revealTitleBtn").style.display="none";
  }

///////////////////////////////////////////////////////////////////////////////


  const updateCard = (id) => async (e) => {
    e.preventDefault()
    setErrors([]);

    const editCard =
    {
      "question": currentQuestion,
      "answer": currentAnswer,
      deckId
    }

    const cardData = await fetch(`/api/cards/${currentCard?.id}`, {
      method: 'PATCH',
      body: JSON.stringify(editCard),
      headers: {
            "Content-Type": "application/json"
          }
      })




      if (cardData.ok) {
        const data = await cardData.json()
        setCurrentCard({});
        setCurrentQuestion('');
        setCurrentAnswer('');

        document.getElementById(`card-display-${id}`).style.display='block';
        document.getElementById(`card-form-${id}`).style.display='none';

        return data;
      } else if (cardData.status < 500) {
        const data = await cardData.json();
        if (data.errors) {
          setErrors(data.errors);

          return data;
        }
      } else {
          return ['An error occurred. Please try again.']
      }

    return currentCard
  }


  const editCard = (id) => async (e) => {
    document.getElementById(`card-display-${id}`).style.display='none';
    document.getElementById(`card-form-${id}`).style.display='block';
  }

  const cancelCard = (id) => async (e) => {
    document.getElementById(`card-display-${id}`).style.display='block';
    document.getElementById(`card-form-${id}`).style.display='none';
    setErrors([]);
    setCurrentCard({});
    setCurrentQuestion('');
    setCurrentAnswer('');
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

};

const myCards = currentDeck?.cards;

const myOrderedCards = myCards?.sort(function(a, b) {
  return a?.id - b?.id;
});


const addCard = async (e) => {
  e.preventDefault()
  setErrors([]);

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

  if (response.ok) {
    const data = await response.json();
    setCurrentCard({});
    setCurrentQuestion('');
    setCurrentAnswer('');
    document.getElementById("add-question").value='';
    document.getElementById("add-answer").value='';
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      setErrors(data.errors);
      setCurrentCard({});
      return data;
    }
  } else {
      return ['An error occurred. Please try again.']
  }
}

// console.log(errors)


  return (
    <main id="main-decks-edit">
      {errors && errors?.map(err => (
        <div className="err-msg">{err?.split(': ')?.pop(-1)}</div>
      ))
      }
      <div>
        <div>
          <h2>{currentDeck && currentDeck?.title}</h2>
          <button id="revealTitleBtn" style={{display:"block"}} onClick={revealTitleForm}>Rename</button>
        </div>
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



        <ul>

          {(currentDeck?.authorId === userId) && myOrderedCards?.map(card => (
            <li>
              <div className="card-display" id={`card-display-${card?.id}`} style={{display:"block"}}>
                <div className="QAdiv">
                  <span>{card?.question}</span>
                </div>
                <div className="QAdiv">
                  <span>
                    {card?.answer}
                  </span>
                </div>
                <div>
                  <button type="button" onClick={editCard(card?.id)}>Edit</button>
                  <button type="button" onClick={deleteCard(card?.id)}>Delete</button>
                </div>
              </div>
              <form id={`card-form-${card?.id}`} style={{display:"none"}} onSubmit={updateCard(card?.id)}>
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
                <button type="button" onClick={cancelCard(card?.id)}>Cancel</button>
              </form>
            </li>
          ))}

        </ul>

        {(currentDeck?.authorId === userId) &&
        <ul id="addCardUL">
          <li>
            <form id="addCardForm" onSubmit={addCard} >
              <span className='createCard'>
                <input
                  id="add-question"
                  className='textInput cardInput'
                  type="text"
                  defaultValue=""
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  placeholder='Ex: Hello'
                />
              </span>
              <span className='createCard'>
                <input
                  id="add-answer"
                  className='textInput cardInput'
                  type="text"
                  defaultValue=""
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder='Ex: 안녕하세요'
                />
              </span>
              <button className='create-card-btn'>Add Card</button>
            </form>
          </li>
        </ul>
        }

        {(currentDeck?.authorId === userId) &&
          <div className="delete-done-btns">
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
