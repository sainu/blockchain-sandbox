import { FC } from 'react';
import './Square.css';

export type SquareValue = 'O' | 'X' | null;
export type Squares = SquareValue[];

interface SquareProps {
  index: number;
  value: SquareValue;
  isHighlight: boolean;
  handleClick: () => void
}

export const Square: FC<SquareProps> = ({
  index,
  value,
  isHighlight,
  handleClick
}: SquareProps) => {
  let className = 'square';
  if (isHighlight) className += ' highlight';
  return (
    <button
      key={index}
      className={className}
      onClick={() => handleClick()}
    >
      {value}
    </button>
  )
}
