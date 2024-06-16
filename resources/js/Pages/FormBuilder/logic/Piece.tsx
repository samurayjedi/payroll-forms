import { Coord } from './Board';

export type PieceType = 'king' | 'pawn';

export type PieceRecord = {
  type: PieceType;
  location: Coord;
};

export function canMove(
  start: Coord,
  destination: Coord,
  pieceType: PieceType,
  pieces: PieceRecord[],
) {
  const rowDist = Math.abs(start[0] - destination[0]);
  const colDist = Math.abs(start[1] - destination[1]);

  if (pieces.find((piece) => isEqualCoord(piece.location, destination))) {
    return false;
  }

  switch (pieceType) {
    case 'king':
      return [0, 1].includes(rowDist) && [0, 1].includes(colDist);
    case 'pawn':
      return colDist === 0 && start[0] - destination[0] === -1;
    default:
      return false;
  }
}
