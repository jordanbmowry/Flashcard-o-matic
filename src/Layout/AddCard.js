import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api';

function AddCard() {
  const initialFormState = {
    id: '',
    front: '',
    back: '',
    deckId: '',
  };
  const [deck, setDeck] = useState({
    name: 'loading...',
    description: '',
    cards: [],
  });
  const [newCardData, setNewCardData] = useState(initialFormState);
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setDeck(() => loadedDeck);
      } catch (error) {
        if (error.name !== 'AbortError') {
          throw error;
        }
      }
    }
    loadDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const changeHandler = ({ target }) => {
    setNewCardData((currentState) => ({
      ...currentState,
      [target.name]: target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await createCard(deckId, newCardData);
    setNewCardData(initialFormState);
    history.go(0);
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
          <li className='breadcrumb-item'>
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Edit Deck
          </li>
        </ol>
      </nav>
      <form onSubmit={submitHandler}>
        <h1 className='my-4 text-center'>{deck.name}: Add Card</h1>
        <div className='form-group'>
          <label htmlFor='front'>Front</label>
          <textarea
            className='form-control'
            id='front'
            name='front'
            rows='5'
            placeholder='Front side of card'
            onChange={changeHandler}
            value={newCardData.front}
            required
          ></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='back'>Back</label>
          <textarea
            className='form-control'
            id='back'
            name='back'
            rows='5'
            placeholder='Back side of card'
            onChange={changeHandler}
            value={newCardData.back}
            required
          ></textarea>
        </div>
        <Link to={`/decks/${deckId}`} className='mr-2'>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => history.push(`/decks/${deckId}`)}
          >
            Done
          </button>
        </Link>
        <button type='submit' className='btn btn-primary'>
          Save
        </button>
      </form>
    </React.Fragment>
  );
}

export default AddCard;
