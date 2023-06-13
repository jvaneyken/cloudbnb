import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import ListingsIndexPage from './components/ListingsIndexPage';
import ListingsShowPage from './components/ListingsShowPage';
import ReservationsIndexPage from './components/ReservationsIndexPage';
import WishlistIndexPage from './components/WishlistIndexPage/WishlistIndexPage';
import { ProtectedRoute } from './components/Routes/Routes';


function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <ListingsIndexPage />
          </Route>
          <Route exact path='/listings/:listingId'>
            <ListingsShowPage />
          </Route>
          <ProtectedRoute exact path='/reservations' component={ReservationsIndexPage} />
          <ProtectedRoute exact path='/wishlists' component={WishlistIndexPage} />
        </Switch>
    </>
  );
}

export default App;
