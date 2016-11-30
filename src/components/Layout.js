/*jshint esversion: 6 */
"use strict";

import React from 'react';
import { Link } from 'react-router';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <header>
          <p>Tic Tac Toe</p>
        </header>
        <div>{this.props.children}</div>
        <footer>
          <p>Created by Hamza Sheikh using: ReactJS | NodeJS | ExpressJS | Sass | Webpack | Grunt</p>
        </footer>
      </div>
    );
  }
}

export default Layout;
