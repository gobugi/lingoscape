import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Dashboard.css";

const Dashboard = () => {

	const sessionUser = useSelector((state) => state?.session?.user);
	const userId = sessionUser?.id;

	const [allDecks, setAllDecks] = useState([]);
	const [myDecks, setMyDecks] = useState([]);
  const [favs, setFavs] = useState([]);
  const [favDecks, setFavDecks] = useState([]);

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


  useEffect(() => {
    async function my_favs() {
			const response = await fetch(`/api/favorites/`);
			const responseData = await response.json();

      const myFavsArr = [];
      responseData?.favorites?.forEach(deck => {
        deck?.followerId === userId && myFavsArr?.push(deck)
      })
      setFavs(myFavsArr)

      const myFavDecksArr = [];
      responseData?.favorites?.forEach(deck => {
        deck?.followerId === userId && myFavDecksArr?.push(deck?.deckId)
      })
      setFavDecks(myFavDecksArr)
		}
    my_favs();
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





  const currFavLangArr = [];

  allDecks && allDecks?.forEach(ele => {
    favs?.forEach(deck => {

      if (ele?.id === deck?.deckId) {
        currFavLangArr.push(ele?.languageId)
      }
    })
  });

  currFavLangArr?.sort(function(a, b) {
    return a - b;
  });

  const newFavArr = [];

  currFavLangArr?.forEach(langId => {
    !newFavArr?.includes(langArr[langId - 1]) && newFavArr?.push(langArr[langId - 1])
  })



  return (
    <main id="all-decks-main">
      <div id="all-decks-content-dashboard" className="all-decks-content">
        <div className="all-decks-header">
          <div className="all-decks-title">
            <h5><br /></ h5>
            <h1 className="all-decks-heading">
              {`Welcome back, ${sessionUser?.username}.`}
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
                        <i className="fas fa-caret-right"></i>
                      </NavLink>
                    </h5>
                  </li>
                ))}
              </>
            ))}

          </ul>
        </div>


        <div className="all-decks-header">
          <div className="all-decks-title">
          </div>
          <br />
          <br />
          <br />
          <hr />
          <div id="all-decks-blurb-dashboard" className="all-decks-blurb">
            My Favorites
          </div>
        </div>

        <div className="all-decks-body">
          <ul className="all-langs-list">
            <li className="lang-item" id="list-initial-spacer" />


            {newFavArr && newFavArr?.map((lang) => (
              <>
                <li className="lang-item">
                  <h4 className="lang-name">
                    {lang}
                  </h4>
                </li>
                {allDecks && allDecks?.sort((a, b) => a?.title?.toLowerCase()?.localeCompare(b?.title?.toLowerCase()))?.map((deck) => (
                  currFavLangArr?.includes(deck?.languageId) && langArr[deck?.languageId - 1] === lang && favDecks?.includes(deck?.id) &&
                  <li className="lang-decks-list">
                    <h5 className="deck-name">
                      <NavLink className="deck-link" to={`/decks/${deck?.id}`}>
                        {`${deck?.title}`}
                        <i className="fas fa-caret-right"></i>
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
