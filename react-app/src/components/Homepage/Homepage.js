import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Homepage.css";
import Carousel from "react-responsive-carousel/lib/js/components/Carousel/index";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Homepage = () => {

  return (
    <main id="home-main">

      <Carousel id="slider" infiniteLoop={true} autoPlay={true} showThumbs={false} showArrows={false} showIndicators={false} showStatus={false} interval={5000} stopOnHover={false}>
        <div>
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
        </div>
      </Carousel>

      <div className="message-container">
        <h1>Explore your new language.</h1>
        <h2>{`Flashcards for `}
          <b>all learners</b>
        </h2>
        <div className="home-btn-container">
          <NavLink id="find-btn" to='/languages'>
            Find Flashcards
          </NavLink>
          <NavLink id="make-btn" to='/languages'>
            Find Flashcards
          </NavLink>
        </div>
      </div>


    </main>
  )
}
export default Homepage;
