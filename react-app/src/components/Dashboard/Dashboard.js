import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Dashboard.css";

const Dashboard = () => {

	const sessionUser = useSelector((state) => state?.session?.user);
	const userId = sessionUser?.id;

	const [allDecks, setAllDecks] = useState([]);
	const [myDecks, setMyDecks] = useState([]);

  const langArr = ["Arabic", "Basque", "Bulgarian", "Catalan", "Chinese", "Croatian", "Czech", "Danish", "Dutch", "Estonian", "Finnish", "French", "Galician", "German", "Greek", "Hebrew", "Hungarian", "Indonesian", "Italian", "Japanese", "Korean", "Latvian", "Lithuanian", "Norwegian", "Polish", "Portuguese", "Romanian", "Russian", "Serbian", "Slovak", "Slovenian", "Spanish", "Swedish", "Thai", "Turkish", "Ukrainian", "Vietnamese"]

  useEffect(() => {
    async function my_deck() {
			const response = await fetch(`/api/decks/`);
			const responseData = await response.json();
			setAllDecks(responseData?.decks);

      const myDecksArr = [];
      responseData?.decks?.forEach(deck => {
        userId === deck?.authorId && myDecksArr?.push(deck)
      })
      setMyDecks(myDecksArr)
		}
    my_deck();
	}, []);



  const currLangArr = [];

  myDecks && (myDecks)?.forEach(deck => {
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

      <div id="all-decks-content-dashboard" className="all-decks-content">
        <div className="all-decks-header">
          <div className="all-decks-title">
            <h1 className="all-decks-heading">
              {`Welcome back ${sessionUser?.username}.`}
            </h1>
          </div>

          <div id="all-decks-blurb-dashboard" className="all-decks-blurb">
            My Decks
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
                {myDecks && myDecks?.map((deck) => (
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
export default Dashboard;
