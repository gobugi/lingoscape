import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { createDeckThunk } from '../../store/newDeck';
import './CreateDeck.css';

const CreateDeck = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state?.session?.user);
  const currUserId = sessionUser?.id;

  const [title, setTitle] = useState("");
  const [languageId, setLanguageId] = useState("");
  const [errors , setErrors] = useState([]);


  const langArr = ["Arabic", "Basque", "Bulgarian", "Catalan", "Chinese", "Croatian", "Czech", "Danish", "Dutch", "Estonian", "Finnish", "French", "Galician", "German", "Greek", "Hebrew", "Hungarian", "Indonesian", "Italian", "Japanese", "Korean", "Latvian", "Lithuanian", "Norwegian", "Polish", "Portuguese", "Romanian", "Russian", "Serbian", "Slovak", "Slovenian", "Spanish", "Swedish", "Thai", "Turkish", "Ukrainian", "Vietnamese"]


  const [deckId, setDeckId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [deckCards, setDeckCards] = useState("");




  const handleDeckSubmit = async (e) => {
    e.preventDefault()
    setErrors([]);

    const newDeck = {
      "title": title,
      "authorId": currUserId,
      "languageId": parseInt(languageId, 10)
    }


    const response = await fetch(`/api/decks`, {
      method: 'POST',
      body: JSON.stringify(newDeck),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    setDeckId(data?.id)

    // document.getElementById("createDeckForm").style.display="none";
    // document.getElementById("createCardForm").style.display="block";
    // document.getElementById("createdTitle").style.visibility="visible";

    // return <Redirect to='/dashboard' />;
    // return history.push(`/decks/${deckId}`);
    return data
  }

  if (deckId) {
    return <Redirect to={`/decks/edit${deckId}`} />;
  }


  // const handleCardSubmit = async (e) => {
  //   e.preventDefault()
  //   setErrors([]);

  //   const newCard = {
  //     deckId,
  //     question,
  //     answer
  //   }


  //   const response = await fetch(`/api/cards`, {
  //     method: 'POST',
  //     body: JSON.stringify(newCard),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   });

  //   const data = await response.json();

  //   const cardsUL = document.getElementById("createdCardsList");
  //   const cardsLi = document.createElement("li");
  //   const cardsSpan1 = document.createElement("span");
  //   const cardsSpan2 = document.createElement("span");

  //   cardsUL.appendChild(cardsLi);

  //   cardsLi.appendChild(cardsSpan1);
  //   cardsLi.appendChild(cardsSpan2);

  //   cardsSpan1.innerHTML = question;
  //   cardsSpan2.innerHTML = answer;

  //   const cardsTextInput = document.getElementsByClassName("cardInput");
  //   cardsTextInput.value = '';
  //   cardsTextInput.placeholder = '';

  //   setQuestion('');
  //   setAnswer('')

  //   document.getElementById("done-btn").style.display="block";

  //   return data
  // }

// console.log(deckCards && deckCards)

  return (
    <main>
      {/* <div id="createdTitle" style={{visibility:"hidden"}}>
        <h1>{title}</h1>
      </div> */}

      <form id="createDeckForm" onSubmit={handleDeckSubmit}>
        <div className='createDeck'>
          <label className='createDeckTitle'></label>
          <input
            className='textInput'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Deck Name'
          />
        </div>
        <div className='createDeck'>
          <label className='selectDeckLanguage'></label>
            <select
              className='langSelect'
              onChange={(e) => setLanguageId(e.target.value)}>
              <option>&nbsp;&nbsp;&nbsp;-- Select Language --&nbsp;&nbsp;&nbsp;</option>
              {langArr?.map((lang, i) => (
                <option value={i += 1}>{lang}</option>
              ))}
            </select>
        </div>
        <button className='create-deck-btn'>Create Deck</button>
      </form>

      {/* <ul id="createdCardsList" />

      <form id="createCardForm" onSubmit={handleCardSubmit} style={{display:"none"}}>
        <div className='createCard'>
          <label className='createCardQuestion'>{langArr[languageId - 1]}: </label>
          <input
            className='textInput cardInput'
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder='Ex: Bonjour'
          />
        </div>
        <div className='createCard'>
          <label className='createCardAnswer'>English: </label>
          <input
            className='textInput cardInput'
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder='Ex: Hello'
          />
        </div>
        <button className='create-card-btn'>Add Card</button>
      </form> */}

      {/* <NavLink id="done-btn" to='/dashboard' exact={true} style={{display:"none"}}>
        <div>
          <span>Done</span>
        </div>
      </NavLink> */}
    </main>
  )
}

export default CreateDeck;
