import { useState, useRef, useEffect } from 'react';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import { Square } from './StyledComponents';
import type { Coord } from './logic/Board';

export default function DroppableSquare({
  location,
  ...props
}: DroppableSquareProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<SquareState>('iddle');

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      onDragEnter: () => setState('validMove'),
      onDragLeave: () => setState('iddle'),
      onDrop: () => setState('iddle'),
    });
  }, []);

  return <Square {...props} ref={ref} state={state} />;
}

export interface DroppableSquareProps
  extends Omit<React.ComponentProps<typeof Square>, 'isDraggedOver' | 'state'> {
  location: Coord;
}

export type SquareState = 'iddle' | 'validMove' | 'invalidMove';
