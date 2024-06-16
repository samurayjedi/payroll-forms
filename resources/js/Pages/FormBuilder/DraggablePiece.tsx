import { useState, useRef, useEffect } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import { Piece } from './StyledComponents';
import type { PieceRecord } from './logic/Piece';

export default function DraggablePiece({
  type,
  location,
  ...props
}: Omit<React.ComponentProps<typeof Piece>, 'dragging'> & {
  type: PieceRecord['type'];
  location: PieceRecord['location'];
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, []);

  return <Piece {...props} ref={ref} dragging={dragging} />;
}
