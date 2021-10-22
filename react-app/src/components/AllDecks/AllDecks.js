import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AllDecks.css';

const AllDecks = () => {

  // const sessionUser = useSelector(state => state?.session?.user);
  // const currUserId = sessionUser?.id;

  // const [title, setTitle] = useState("");
  // const [languageId, setLanguageId] = useState("");
  const [decks, setDecks] = useState("");

  const langArr = ["Arabic", "Basque", "Bulgarian", "Catalan", "Chinese", "Croatian", "Czech", "Danish", "Dutch", "Estonian", "Finnish", "French", "Galician", "German", "Greek", "Hebrew", "Hungarian", "Indonesian", "Italian", "Japanese", "Korean", "Latvian", "Lithuanian", "Norwegian", "Polish", "Portuguese", "Romanian", "Russian", "Serbian", "Slovak", "Slovenian", "Spanish", "Swedish", "Thai", "Turkish", "Ukrainian", "Vietnamese"]

  useEffect(() => {

    async function all_decks() {
      const response = await fetch('/api/decks');
      const responseData = await response.json();
      setDecks(responseData);
    }

    all_decks();
  }, []);

// map this ====> decks?.decks
// console.log((decks && decks?.decks[0]?.languageId))

  const currLangArr = [];

  decks && (decks?.decks)?.forEach(deck => {
    if (!currLangArr?.includes(deck?.languageId)) {
      currLangArr.push(deck?.languageId)
    }
  });

  currLangArr?.sort(function(a, b) {
    return a - b;
  });

  const newArr = [];

  currLangArr?.forEach(langId => {
    newArr?.push(langArr[langId - 1])
  })

  return (
    <main>
      <div className="all-decks-container">
        {newArr && newArr?.map((lang) => (
          <div className="lang-container">
            <h1>{lang}</h1>
            <ul>
            {decks && decks?.decks?.map((deck) => (
              currLangArr?.includes(deck?.languageId) && langArr[deck?.languageId - 1] === lang &&
              <li>{deck?.title}</li>
            ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  )
}

export default AllDecks;
