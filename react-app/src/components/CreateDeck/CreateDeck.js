import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { createDeckThunk } from '../../store/newDeck';
import './CreateDeck.css';

const CreateDeck = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();
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


    const response = await fetch(`/api/decks/`, {
      method: 'POST',
      body: JSON.stringify(newDeck),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    setDeckId(data?.id)

    return data
  }



  const handleCardSubmit = async (e) => {
    e.preventDefault()
    setErrors([]);

    const newCard = {
      deckId,
      question,
      answer
    }


    const response = await fetch(`/api/cards/`, {
      method: 'POST',
      body: JSON.stringify(newCard),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    return data
  }


  // useEffect(() => {

  //   async function deck_cards() {
  //     const response = await fetch(`/api/cards`);
  //     const responseData = await response.json();

  //     const cards = responseData?.cards
  //     const this_deck_cards = [];

  //     cards?.forEach(card => {
  //       if (deckId === card?.deckId) {
  //         this_deck_cards?.push(card)
  //       }
  //     })

  //     setDeckCards(this_deck_cards);
  //   }


  //   deck_cards();
  // }, []);

  // console.log(deckCards)

  // useEffect(() => {

  //   async function single_deck() {
  //     const response = await fetch(`/api/decks/${deckId}`);
  //     const responseData = await response.json();
  //     setDeck(responseData);
  //   }

  //   single_deck();
  // }, []);

  // // const cardsArr = deck && (deck?.deck[0]?.cards)

  return (
    <main>
      <form id="createDeckForm" onSubmit={handleDeckSubmit}>
        <div className='createDeck'>
          <label className='createDeckTitle'>Deck Title </label>
          <input
            className='textInput'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Deck Title'
          />
        </div>
        <div className='createDeck'>
          <label className='selectDeckLanguage'>Select a Language </label>
            <select
              className='langSelect'
              onChange={(e) => setLanguageId(e.target.value)}>
              <option>-- select --</option>
              {langArr?.map((lang, i) => (
                <option value={i += 1}>{lang}</option>
              ))}
            </select>
        </div>
        <button className='create-deck-btn'>Create Deck</button>
      </form>


<hr />


      <form id="createCardForm" onSubmit={handleCardSubmit}>
        <div className='createCard'>
          <label className='createCardQuestion'>{langArr[languageId - 1]}: </label>
          <input
            className='textInput'
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder='Ex: Bonjour'
          />
        </div>
        <div className='createCard'>
          <label className='createCardAnswer'>English: </label>
          <input
            className='textInput'
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder='Ex: Hello'
          />
        </div>
        <button className='create-card-btn'>Add Card</button>
      </form>


      <hr />

      <h1>{title}</h1>
      <ul>
        {deckCards && deckCards?.map(card => {
          <li>
            {card?.question}, {card?.answer}
          </li>
        }) }
      </ul>




    </main>
  )
}

export default CreateDeck;
