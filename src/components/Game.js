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
    if (this.calculateWinner(squares).player || squares[i]) {
      return;
    }
    if (this.state.stepNumber < history.length - 1) {
      history = history.slice(0, this.state.stepNumber + 1);
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
    if (this.calculateWinner(squares).player && step === 0) {
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
        return {
          player: squares[a],
          winningLine: lines[i]
        };
      }
    }
    return {
      player: null,
      winningLine: []
    };
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    const player = this.state.xIsNext ? 'X' : 'O';
    const winningSquares = winner.winningLine;
    let status;
    if (winner.player) {
      status = (
        <p>
          Winner: <span className={(winner.player === 'X') ? "player-cross" : "player-circle"}>{winner.player}</span>
        </p>
      );
    } else {
      status = (
        <p>
          Next player: <span className={(player === 'X') ? "player-cross" : "player-circle"}>{player}</span>
        </p>
      );
    }
    const moves = history.map((step, move) => {
      const desc = move ? `Move #${move}` : 'Game start';
      return (
        <li key={move} className={(move === this.state.stepNumber) ? "move-active" : "move"}>
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
            winningSquares={winningSquares}
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
