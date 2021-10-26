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

      cardsArr.forEach(card => {
        newCardsArr?.push(card?.question);
        newCardsArr?.push(card?.answer);
      })

      setCurrentDeck(newCardsArr)

		}
    my_deck();
	}, []);

  return (
    <main id="main-study">

      <Carousel id="study-slider" infiniteLoop={false} autoPlay={false} showThumbs={false} showArrows={true} showIndicators={false} showStatus={false} emulateTouch={true}>

        {currentDeck && currentDeck?.map(card => (
          <div>
            {card}
          </div>
        ))
        }


        {/* <div>
          <img className="splash-images" alt="img1" src="https://images.unsplash.com/photo-1483389127117-b6a2102724ae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80" />
        </div>
        <div>
          <img className="splash-images" alt="img2" src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80" />
        </div>
        <div>
          <img className="splash-images" alt="img3" src="https://images.unsplash.com/photo-1503945438517-f65904a52ce6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" />
        </div>
        <div>
          <img className="splash-images" alt="img4" src="https://images.unsplash.com/photo-1543269866-487350d6fa5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
        </div>
        <div>
          <img className="splash-images" alt="img5" src="https://images.unsplash.com/photo-1521633286323-05b17f47cb74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80" />
        </div>
        <div>
          <img className="splash-images" alt="img6" src="https://images.unsplash.com/photo-1543269664-76bc3997d9ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
        </div> */}
      </Carousel>

    </main>
  )
}
export default StudyDeck;
