

export const createDeckThunk = (newDeck) => async () => {
  const resDeck = await fetch('/api/decks', {
      method: 'POST',
      body: newDeck
  });

  if (resDeck.ok) {
      const data = await resDeck.json();
      return data;

  } else if (resDeck.status < 500) {
      const data = await resDeck.json();

      if (data.errors) {
          return data;
      }
  } else {
      return ['Oops. Looks like something went wrong. Please try again.']
  }
}
