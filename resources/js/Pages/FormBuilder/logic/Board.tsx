import { PieceRecord } from './Piece';

export const initialValues: PieceRecord[] = [
  { type: 'king', location: [3, 2] },
  { type: 'pawn', location: [1, 6] },
];

export default function Board({ children }: BoardProps) {
  return (
    <>
      {[...Array(8)].map((__, row) =>
        [...Array(8)].map((___, col) => children([row, col])),
      )}
    </>
  );
}

export type BoardProps = {
  children: (location: Coord) => React.ReactNode;
};

export type Coord = [number, number];

export function isEqualCoord(c1: Coord, c2: Coord): boolean {
  return c1[0] === c2[0] && c1[1] === c2[1];
}
