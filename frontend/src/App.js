import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import ListingsIndexPage from './components/ListingsIndexPage';

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
        </Switch>
    </>
  );
}

export default App;
