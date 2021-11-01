# Lingoscape &nbsp;[![favicon](https://raw.githubusercontent.com/gobugi/lingoscape/main/react-app/public/favicon.ico)](https://lingoscape.herokuapp.com/)

*By Johnny Park - Visit [Lingoscape](https://lingoscape.herokuapp.com/)*

## Overview

This app was designed as a clone of the well-known flashcard-based website, [Brainscape](https://www.brainscape.com//).  However there is one key difference.  Lingoscape is designed specifically to help users learn new languages through language-based flashcards.  These flashcards are available for use by anyone.  If one would like to contribute a new set of language flashcards to the database, they would have to first create an account.  Studies have shown that studying through spaced repetition often leads to more efficient long-term memory, so this would be a perfect app for both casual and serious language learners.

## Application Architecture
Lingoscape was created utilizing Flask, Python, PostgreSQL database, and SQLAlchemy for the backend, and React, JavaScript, HTML, and CSS for frontend.  Npm package "react-responsive-carousel" was implemented for homepage image slider as well as for the mechanism to peruse through a deck of flashcards.

### Homepage
![1-homepage](https://user-images.githubusercontent.com/80723197/139628254-42d0b54b-6089-470d-8b70-d3bfdcc16462.png)

### All decks
![2-alldecks](https://user-images.githubusercontent.com/80723197/139628255-6502656e-f451-4363-ac11-36d4334656d4.png)

### Personalized dashboard
![3-dashboard](https://user-images.githubusercontent.com/80723197/139628256-ac7a37b9-b77b-4363-91e2-f8038415b6ae.png)

### Creating a deck
![4-createdeck](https://user-images.githubusercontent.com/80723197/139628257-a783c45a-9e1d-4b11-8ef2-d829aa85633f.png)

### Adding cards to the deck
![5-addcards](https://user-images.githubusercontent.com/80723197/139628258-8b2063f3-c0b6-474f-8185-b3e54b8be439.png)

### Completed deck
![6-completeddeck](https://user-images.githubusercontent.com/80723197/139628259-f8da6997-9cfa-4617-8b98-5bb4177daae9.png)

### Study flashcards
![7-card1](https://user-images.githubusercontent.com/80723197/139628260-cc96c3f2-af0e-484f-88ab-300cab7270d0.png)
![8-card2](https://user-images.githubusercontent.com/80723197/139628262-43f70256-6979-4e4f-945e-e8cfe20d1c54.png)

## Future Implementations
I would like to expand on the user page:
* Allow user to upload or link a profile pictures to replace default profile picture.
* Allow user to change password and/or email.

I'd also like to implement a "favorite" or "currently studying" feature that allows a user to add decks from other users/self to the dashboard.  The user would be able to add/remove decks to/from the "favorites" collection at any time. 
