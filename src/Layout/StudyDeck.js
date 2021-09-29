import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck } from '../utils/api';

function StudyDeck() {
  const initialState = {
    deck: { name: 'loading...', cards: [] },
    error: null,
    isCardFlipped: false,
    currentIndex: 0,
  };

  const [studyDeckState, setStudyDeckState] = useState(initialState);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setStudyDeckState((currentState) => ({
          ...currentState,
          deck: [loadedDeck],
        }));
      } catch (error) {
        setStudyDeckState((currentState) => ({
          ...currentState,
          error: [error],
        }));
        return error;
      }
    }
    loadDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  function flipCardHandler() {
    setStudyDeckState({
      ...studyDeckState,
      isCardFlipped: !studyDeckState['isCardFlipped'],
    });
  }

  function getNextCard() {
    const { currentIndex, deck } = studyDeckState;
    const { cards } = deck?.[0];
    if (currentIndex === cards.length - 1) {
      const response = window.confirm(
        'Do you want to restart the deck and study again?'
      );
      if (response) {
        setStudyDeckState((currentState) => ({
          ...currentState,
          currentIndex: 0,
        }));
      }
    } else {
      setStudyDeckState((currentState) => ({
        ...currentState,
        currentIndex: currentState.currentIndex++,
        isCardFlipped: !currentState.isCardFlipped,
      }));
    }
  }

  const breadcrumb = (
    <nav aria-label='breadcrumb'>
      <ol className='breadcrumb'>
        <li className='breadcrumb-item'>
          <Link to='/'>
            <i className='fas fa-home'></i> Home
          </Link>
        </li>
        <li className='breadcrumb-item'>
          <Link to={`/deck/${deckId}`}>{studyDeckState?.deck[0]?.name}</Link>
        </li>
        <li className='breadcrumb-item active' aria-current='page'>
          Study
        </li>
      </ol>
    </nav>
  );

  if (studyDeckState.deck?.[0]?.cards.length <= 2) {
    return (
      <React.Fragment>
        {breadcrumb}
        <div className='card'>
          <div className='card-body'>
            <h1 className='card-title'>Not enough cards.</h1>
            <p className='card-text'>
              You need at least 3 cards to study. Please add more cards to this
              deck.
            </p>
            <Link to={`/decks/${deckId}/cards/new`}>
              <button type='button' className='btn btn-primary'>
                <i className='fas fa-plus'></i> Add Card
              </button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        {breadcrumb}
        <h1>Currently Studying: {studyDeckState.deck?.[0]?.name} </h1>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>
              Card {studyDeckState.currentIndex + 1} of{' '}
              {studyDeckState.deck?.[0]?.cards.length}
            </h5>
            <p className='card-text'>
              {!studyDeckState.isCardFlipped
                ? `Question: ${
                    studyDeckState.deck?.[0]?.cards[studyDeckState.currentIndex]
                      ?.front
                  }`
                : `Answer: ${
                    studyDeckState.deck?.[0]?.cards[studyDeckState.currentIndex]
                      ?.back
                  }`}
            </p>
          </div>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => flipCardHandler()}
          >
            Flip
          </button>
          {studyDeckState.isCardFlipped && (
            <button className='btn btn-primary' onClick={() => getNextCard()}>
              Next
            </button>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default StudyDeck;
