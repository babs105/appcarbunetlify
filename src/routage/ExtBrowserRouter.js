import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

const ExtBrowserRouter = ({children}) => (
  <Router history={history} >
  { children }
  </Router>
);

export default ExtBrowserRouter;
