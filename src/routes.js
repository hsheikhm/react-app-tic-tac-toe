/*jshint esversion: 6 */
"use strict";

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import Game from './components/Game';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Game}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
