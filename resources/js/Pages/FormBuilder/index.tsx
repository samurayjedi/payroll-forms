/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Container } from '@mui/material';
import AppLayout from '@/src/Layouts/AppLayout';
import Board, { initialValues, Coord } from './logic/Board';
import { PieceType } from './logic/Piece';
import { Chessboard } from './StyledComponents';
import DroppableSquare from './DroppableSquare';
import DraggablePiece from './DraggablePiece';
import king from './assets/king.png';
import pawn from './assets/pawn.png';

export default function FormBuilder() {
  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Chessboard>
          <Board>
            {([row, col]) => {
              const piece = initialValues.find(
                (piwi) => piwi.location[0] === row && piwi.location[1] === col,
              );

              return (
                <DroppableSquare
                  key={`square-${row}-${col}`}
                  isDark={(row + col) % 2 === 1}
                  location={[row, col]}
                >
                  {piece && pieceLookup[piece.type](piece.location)}
                </DroppableSquare>
              );
            }}
          </Board>
        </Chessboard>
      </Container>
    </AppLayout>
  );
}

const pieceLookup: {
  [Key in PieceType]: (location: Coord) => React.ReactNode;
} = {
  king: (location) => (
    <DraggablePiece src={king} alt="King" type="king" location={location} />
  ),
  pawn: (location) => (
    <DraggablePiece src={pawn} alt="Pawn" type="pawn" location={location} />
  ),
};
