import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory, Route } from 'react-router-dom';
import { deleteDeck, readDeck } from '../utils/api';
import ViewCards from './ViewCards';

function ViewDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ name: 'loading...', cards: [] });

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(() => ({ ...response }));
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log(error);
        } else {
          throw error;
        }
      }
    }
    loadDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const deleteHandler = async (deckId) => {
    const response = window.confirm(
      'Delete this deck? You will not be able to recover it.'
    );
    if (response) {
      await deleteDeck(deckId);
      history.go(0);
    }
  };

  return (
    <React.Fragment>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <i className='fas fa-home'></i> Home
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className='card'>
        <div className='card-header text-center'>
          <h2>{deck.name}</h2>
        </div>
        <div className='card-body'>
          <blockquote className='blockquote mb-0'>
            <p>{deck?.description}</p>
          </blockquote>
          <div className='d-flex justify-content-around'>
            <Link to={`/decks/${deck.id}/edit`}>
              <button
                className='btn btn-secondary'
                onClick={() => history.push(`/decks/${deck.id}/edit`)}
              >
                <i className='fas fa-edit'></i> Edit
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => history.push(`/decks/${deck.id}/study`)}
              >
                <i className='fas fa-book'></i> Study
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/cards/new`}>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
              >
                <i className='fas fa-plus'></i> Add Cards
              </button>
            </Link>
            <button
              type='button'
              className='btn btn-danger'
              onClick={deleteHandler}
            >
              <i className='fas fa-trash'></i> Delete Deck
            </button>
          </div>
        </div>
      </div>
      <Route>
        <ViewCards cards={deck.cards} />
      </Route>
    </React.Fragment>
  );
}

export default ViewDeck;
