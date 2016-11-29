/*jshint esversion: 6 */
"use strict";

import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    let history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    if (this.state.stepNumber < history.length - 1) {
      history = history.slice(0, this.state.stepNumber + 1);
      this.setState({
        history: history
      });
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) && step === 0) {
      this.setState({
        history: [{
          squares: Array(9).fill(null)
        }],
        stepNumber: 0,
        xIsNext: true
      });
      return;
    }

    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    const moves = history.map((step, move) => {
      const desc = move ? `Move #${move}` : 'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
