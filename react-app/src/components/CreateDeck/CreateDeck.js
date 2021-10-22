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







  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([]);

    const newDeck = {
      title,
      "authorId": currUserId,
      "languageId": parseInt(languageId, 10)
    }

    console.log(newDeck)

    const response = await fetch(`/api/decks/`, {
      method: 'POST',
      body: JSON.stringify(newDeck),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    return data
  }





  return (
    <main>
      <form id="createDeckForm" onSubmit={handleSubmit}>
        <div className='createDeckTitle'>
          <label className='createDeckLabel'>Deck Title </label>
          <input
            className='listingInput'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Deck Title'
          />
        </div>
        <div className='createDeckTitle'>
          <label className='createDeckLabel'>Select a Language </label>
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
    </main>
  )
}

export default CreateDeck;
