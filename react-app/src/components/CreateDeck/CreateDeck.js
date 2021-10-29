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
  const [languageId, setLanguageId] = useState(0);
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



    if (response.ok) {
      const data = await response.json();
      setDeckId(data?.id)
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);

        return data;
      }
    } else {
        return ['An error occurred. Please try again.']
    }
  }


  if (deckId) {
    return <Redirect to={`/decks/edit/${deckId}`} />;
  }

  // console.log(errors)

  return (
    <main id="main-new-deck">

      <h1 id="create-deck-heading" className="all-decks-heading">
        Let's get started
      </h1>

      {errors && errors?.map(err => (
        <div className="err-msg">{err?.split(': ')?.pop(-1)}</div>
      ))
      }


      <form id="createDeckForm" onSubmit={handleDeckSubmit}>
        <div className='createDeck'>
          <label className='createDeckTitle'></label>
          <input
            className='textInput'
            type="text"
            defaultValue=""
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Deck Name'
          />
        </div>
        <div className='createDeck'>
          <label className='selectDeckLanguage'></label>
            <select
              className='langSelect'
              onChange={(e) => setLanguageId(e.target.value)}>
              <option value={0}>&nbsp;&nbsp;&nbsp;-- Select Language --&nbsp;&nbsp;&nbsp;</option>
              {langArr?.map((lang, i) => (
                <option value={i += 1}>{lang}</option>
              ))}
            </select>
        </div>
        <button className='create-deck-btn'>Create Deck</button>
      </form>

    </main>
  )
}

export default CreateDeck;
