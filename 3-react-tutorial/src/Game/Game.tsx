import { FC, useEffect, useState } from 'react';
import './Game.css';
import { Board } from '../Board/Board';
import { Squares, SquareValue } from '../Square/Square';

interface HistoryStep {
  id: number;
  squares: Squares;
  position?: number;
}

export type Winner = SquareValue | 'draw';

export const lineSet = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export const Game: FC = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState<HistoryStep[]>([{ id: 1, squares: Array(9).fill(null) }]);
  const [sortedHistory, setSortedHistory] = useState<HistoryStep[]>([]);
  const [stepNumber, setStepNumber] = useState(0);
  const [orderAsc, setOrderAsc] = useState(true);
  const [isSelectHistory, setIsSelectHistory] = useState(false);

  const current = history[stepNumber];

  const calculateWinner = (squares: Squares): Winner => {
    for (let i = 0; i < lineSet.length; i++) {
      const [a, b, c] = lineSet[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (!squares.some(s => s === null)) return 'draw';
    return null;
  }
  const winner = calculateWinner(current.squares);
  let status;
  if (winner === 'draw') {
    status = 'Draw!'
  } else if (winner === 'O' || winner === 'X') {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player:${xIsNext ? 'X' : 'O'}`;
  }

  const handleJumpTo = (step: number) => {
    const _step = orderAsc ? step : history.length - step - 1;
    setStepNumber(_step);
    setXIsNext(_step % 2 === 0);
    setIsSelectHistory(true);
  }

  const handleClick = (i: number) => {
    const _history = history.slice(0, stepNumber + 1);
    const _current = _history[_history.length - 1];
    const _squares = _current.squares.slice();
    if (calculateWinner(_squares) || _squares[i]) {
      return;
    }
    _squares[i] = xIsNext ? 'X' : 'O';
    setHistory(_history.concat([{ id: _current.id + 1, squares: _squares, position: i }]))
    setXIsNext(!xIsNext);
    setStepNumber(_history.length);
    setIsSelectHistory(false);
  }

  const handleResetGame = () => {
    setXIsNext(true);
    setHistory([{ id: 1, squares: Array(9).fill(null) }]);
    setStepNumber(0);
  }

  const handleClickSort = () => {
    setOrderAsc(!orderAsc);
  }

  useEffect(() => {
    const _history = history.slice().sort((a, b) => {
      if (a.id < b.id) return orderAsc ? -1 : 1;
      if (a.id > b.id) return orderAsc ? 1 : -1;
      return 0;
    })
    setSortedHistory(_history);
  }, [orderAsc, history]);

  return (
    <div className="game">
    <div className="game-board">
      <Board
        squares={current.squares}
        winner={winner}
        handleClick={(i) => handleClick(i)}
      />
      <button onClick={() => handleResetGame()}>Reset</button>
    </div>
    <div className="game-info">
      <div>{status}</div>
      <div>
        <button onClick={() => handleClickSort()}>
          {orderAsc ? '降順' : '昇順'}
        </button>
      </div>
      <ol className='history'>
        {sortedHistory.map((step, move) => {
          const desc = typeof step.position === 'number' ? `Go to move #${step.id}` : 'Go to game start';
          return (
            <li
              key={move}
              className={current.id === step.id && isSelectHistory ? 'bold' : ''}
            >
              <button
                onClick={() => handleJumpTo(move)}
              >
                {desc}
              </button>
              {typeof step.position === 'number' ? `座標(${step.position % 3 + 1}, ${Math.floor(step.position / 3) + 1})` : <></>}
            </li>
          )
        })}
      </ol>
    </div>
  </div>
  )
}
