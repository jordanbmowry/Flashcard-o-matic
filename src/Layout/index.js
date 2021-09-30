import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import Home from './Home';
import StudyDeck from './StudyDeck';
import CreateDeck from './CreateDeck';
import ViewDeck from './ViewDeck';
import EditDeck from './EditDeck';

function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className='container'>
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path='/'>
            <Link to='/decks/new'>
              <button className='btn btn-secondary'>
                <i className='fas fa-plus'></i> Create Deck
              </button>
            </Link>
            <Home />
          </Route>
          <Route exact path='/decks/new'>
            <CreateDeck />
          </Route>
          <Route exact path='/decks/:deckId/study'>
            <StudyDeck />
          </Route>
          <Route exact path='/decks/:deckId/edit'>
            <EditDeck />
          </Route>
          <Route exact path='/decks/:deckId'>
            <ViewDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;
