/*jshint esversion: 6 */
"use strict";

import React from 'react';

class Square extends React.Component {
  squareColor() {
    return this.props.value === 'X' ? "square cross" : "square circle";
  }

  render() {
    return (
      <button className={this.squareColor()} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

export default Square;
