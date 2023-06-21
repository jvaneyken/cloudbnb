import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import ListingsIndexPage from './components/ListingsIndexPage';
import ListingsShowPage from './components/ListingsShowPage';
import ReservationsIndexPage from './components/ReservationsIndexPage';
import WishlistIndexPage from './components/WishlistIndexPage/WishlistIndexPage';
import { ProtectedRoute } from './components/Routes/Routes';
import SignupForm from './components/SessionForms/SignupForm';
import LoginForm from './components/SessionForms/LoginForm';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const user = useSelector(state => state.session.user);
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/signup">
          {user ? <Redirect to='/'/> : <SignupForm />}
          </Route>
          <Route path="/login">
            {user ? <Redirect to='/'/> : <LoginForm />}
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
