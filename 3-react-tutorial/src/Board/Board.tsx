import { FC, useEffect } from 'react';
import { lineSet, Winner } from '../Game/Game';
import { Square, Squares } from '../Square/Square';
import './Board.css';

interface BoardProps {
  squares: Squares;
  winner: Winner;
  handleClick: (i: number) => void;
}

export const Board: FC<BoardProps> = ({
  squares,
  winner,
  handleClick
}: BoardProps) => {
  const highlight = Array(9).fill(false);
  console.log(winner)
  if (winner) {
    for (let i = 0; i < lineSet.length; i++) {
      const [a, b, c] = lineSet[i];
      if (squares[a] === winner && squares[b] === winner && squares[c] === winner) {
        if (highlight[a] === false) highlight[a] = true;
        if (highlight[b] === false) highlight[b] = true;
        if (highlight[c] === false) highlight[c] = true;
      }
    }
  }
  console.log(highlight)

  const board = [];
  for (let i = 0; i < 3; i++) {
    const cols = [];
    for (let j = 0; j < 3; j++) {
      const squareIndex = j + (i * 3);
      cols.push(
        <Square
          index={squareIndex}
          value={squares[squareIndex]}
          isHighlight={highlight[squareIndex]}
          handleClick={() => handleClick(squareIndex)}
        />
      )
    }
    board.push(
      <div key={i} className="board-row">
        {cols}
      </div>
    )
  }

  return (
    <div>{board}</div>
  )
}
