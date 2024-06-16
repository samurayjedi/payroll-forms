import styled from '@emotion/styled';
import type { SquareState } from './DroppableSquare';

export const Chessboard = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
  gridTemplateRows: 'repeat(8, 1fr)',
  width: '500px',
  height: '500px',
  border: '3px solid lightgrey',
});

export const Square = styled.div<{ isDark: boolean; state: SquareState }>(
  ({ isDark, state }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: (() => {
      if (state === 'validMove') {
        return 'lightblue';
      }

      return isDark ? 'lightgrey' : 'white';
    })(),
  }),
);

export const Piece = styled.img<{ dragging: boolean }>(({ dragging }) => ({
  width: 45,
  height: 45,
  padding: 4,
  borderRadius: 6,
  boxShadow:
    '1px 3px 3px rgba(9, 30, 66, 0.25),0px 0px 1px rgba(9, 30, 66, 0.31)',
  '&:hover': {
    backgroundColor: 'rgba(168, 168, 168, 0.25)',
  },
  opacity: dragging ? 0.4 : 1,
}));
