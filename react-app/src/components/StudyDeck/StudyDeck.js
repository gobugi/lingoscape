import React, { useState, useEffect } from "react";
import { NavLink, Redirect, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./StudyDeck.css";
import Carousel from "react-responsive-carousel/lib/js/components/Carousel/index";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const StudyDeck = () => {

  const sessionUser = useSelector(state => state?.session?.user);

  const location = useLocation();
  const deckId = +(window.location?.pathname?.split('/').pop(-1));

  const [currentDeck, setCurrentDeck] = useState([]);

  useEffect(() => {
    async function my_deck() {
			const response = await fetch(`/api/decks/${deckId}`);
			const responseData = await response.json();

      const newCardsArr = []

      const cardsArr = responseData?.deck[0]?.cards

      const orderedCardsArr = cardsArr?.sort(function(a, b) {
        return a?.id - b?.id;
      });

      orderedCardsArr.forEach(card => {
        newCardsArr?.push(card?.question);
        newCardsArr?.push(card?.answer);
      })

      setCurrentDeck(newCardsArr)

		}
    my_deck();
	}, []);

  return (
    <main id="main-study">

      <Carousel id="study-slider" infiniteLoop={false} autoPlay={false} showThumbs={false} showArrows={true} showIndicators={false} showStatus={false} emulateTouch={false} useKeyboardArrows={true}>

        {currentDeck && currentDeck?.map(card => (
          <div className="study-div">
            <div>{card}</div>
          </div>
        ))
        }

      </Carousel>

      <NavLink id="done-btn" to={`/decks/${deckId}`}>
        <div>
          <span>Done</span>
        </div>
      </NavLink>

    </main>
  )
}
export default StudyDeck;
