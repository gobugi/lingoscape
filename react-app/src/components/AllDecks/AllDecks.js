import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AllDecks.css';

const AllDecks = () => {

  // const sessionUser = useSelector(state => state?.session?.user);
  // const currUserId = sessionUser?.id;

  // const [title, setTitle] = useState("");
  // const [languageId, setLanguageId] = useState("");

  const langArr = ["Arabic", "Basque", "Bulgarian", "Catalan", "Chinese", "Croatian", "Czech", "Danish", "Dutch", "Estonian", "Finnish", "French", "Galician", "German", "Greek", "Hebrew", "Hungarian", "Indonesian", "Italian", "Japanese", "Korean", "Latvian", "Lithuanian", "Norwegian", "Polish", "Portuguese", "Romanian", "Russian", "Serbian", "Slovak", "Slovenian", "Spanish", "Swedish", "Thai", "Turkish", "Ukrainian", "Vietnamese"]

  const [decks, setDecks] = useState("");
  const [searchWords, setSearchWords] = useState("");
  const [hiddenLangs, setHiddenLangs] = useState([]);


  useEffect(() => {

    async function all_decks() {
      const response = await fetch('/api/decks/');
      const responseData = await response.json();
      setDecks(responseData);
    }

    all_decks();
  }, [searchWords]);

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

/////////////////////S E A R C H    F I L T E R////////////////////////////


if (document.getElementById("search-field")?.value) {

  langArr?.forEach(lang => {
    if ( document.getElementById(`${lang}-div`) && lang?.toLowerCase()?.startsWith(document.getElementById("search-field")?.value?.toLowerCase()) ) {
      document.getElementById(`${lang}-div`)?.setAttribute("style","display:block;");
    } else if ( document.getElementById(`${lang}-div`) && !lang?.toLowerCase()?.startsWith(document.getElementById("search-field")?.value?.toLowerCase()) ) {
      document.getElementById(`${lang}-div`)?.setAttribute("style","display:none;");
    }
  })

} else {
  langArr?.forEach(lang => {
    if (document.getElementById(`${lang}-div`)) {
      document.getElementById(`${lang}-div`)?.setAttribute("style","display:block;");
    }
  })
}


const myOrderedDecks = decks?.decks?.sort(function(a, b) {
  return a?.title?.toLowerCase()?.localeCompare(b?.title?.toLowerCase());
});


///////////////////////////////////////////////////////////////////////////



  return (
    <main id="all-decks-main">

      {/* ///////////////////////THIS IS MY SEARCHBAR IMPLEMENTATION//////////////////////////////////// */}
      <div className="search-bar">
        <i id="fa-search-decks" className="fas fa-search" style={{display:"block", color:"#d6d4d4"}}></i>
        <input
          id="search-field"
          placeholder="Search by language e.g. French, Korean, Spanish"
          type="text"
          // defaultValue=''
          onChange={(e) => setSearchWords(e.target.value?.toLowerCase())}
        />
      </div>
      {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}

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
              <div id={`${lang}-div`} className="lang-div" style={{display:"block"}}>
                <li className="lang-item">
                  <h4 className="lang-name">
                    {lang}
                  </h4>
                </li>
                {decks && myOrderedDecks?.map((deck) => (
                  currLangArr?.includes(deck?.languageId) && langArr[deck?.languageId - 1] === lang &&
                  <li className="lang-decks-list">
                    <h5 className="deck-name">
                      <NavLink className="deck-link" to={`/decks/${deck?.id}`}>
                        {`${deck?.title}`}
                        <i className="fas fa-caret-right"></i>
                      </NavLink>
                    </h5>
                  </li>
                ))}
              </div>
            ))}

          </ul>
        </div>
      </div>

    </main>
  )
}

export default AllDecks;
