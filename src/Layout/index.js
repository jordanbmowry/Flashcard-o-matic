import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import Home from './Home';
import StudyDeck from './StudyDeck';

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
          <Route path='/decks/:deckId/study'>
            <StudyDeck />
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
