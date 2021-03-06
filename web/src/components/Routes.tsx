import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { PrivateMe } from '../pages/PrivateMe';
import { Register } from '../pages/Register';
import { Header } from './Header';

export function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/private-me" exact component={PrivateMe} />
      </Switch>
    </BrowserRouter>
  );
}
