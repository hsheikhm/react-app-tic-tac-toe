/*jshint esversion: 6 */
"use strict";

import React from 'react';

class Square extends React.Component {
  squareColor() {
    let color;
    color = (this.props.value === 'X') ? "square cross" : "square circle";
    color += this.props.winningSquare ? " green-square" : " normal-square";
    return color;
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
