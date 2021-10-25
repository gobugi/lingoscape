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
      const response = await fetch('/api/decks/');
      const responseData = await response.json();
      setDecks(responseData);
    }

    all_decks();
  }, []);

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
    <main id="all-decks-main">

      <div className="all-decks-content">
        <div className="all-decks-header">
          <div className="all-decks-title">
            <h1 className="all-decks-heading">
              Discover a Language
            </h1>
          </div>

          <div className="all-decks-blurb">
            Browse from thousands of flashcards created by top students, professors, publishers, and experts, spanning the world's vast plethora of languages.
          </div>
        </div>

        <div className="all-decks-body">
          <ul className="all-langs-list">
            <li className="lang-item" id="list-initial-spacer" />


            {newArr && newArr?.map((lang) => (
              <>
                <li className="lang-item">
                  <h4 className="lang-name">
                    {lang}
                  </h4>
                </li>
                {decks && decks?.decks?.map((deck) => (
                  currLangArr?.includes(deck?.languageId) && langArr[deck?.languageId - 1] === lang &&
                  <li className="lang-decks-list">
                    <h5 className="deck-name">
                      <NavLink className="deck-link" to={`/decks/${deck?.id}`}>
                        {`${deck?.title}`}
                        <i class="fas fa-caret-right"></i>
                      </NavLink>
                    </h5>
                  </li>
                ))}
              </>
            ))}

          </ul>
        </div>
      </div>

    </main>
  )
}

export default AllDecks;
