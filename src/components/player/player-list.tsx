'use client';

import { reorderList } from '@/utils/list-manager';
import { DropResult } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import DroppableList from '@/components/dnd/droppable-list';
import DraggableItem from '@/components/dnd/draggable-item';
import DragDropContextProvider from '@/context/drag-drop-provider';
import { Competitor } from '@/models/competitor';

interface PlayerListProps {
  players: Competitor[];
}

export function PlayerList({ players }: PlayerListProps) {
  const [items, setItems] = useState<Competitor[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setItems(players);
    setIsClient(true);
  }, [players]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    setItems((prevItems) =>
      reorderList(prevItems, source.index, destination.index)
    );
  };

  if (!isClient) {
    return null; // or a loading state
  }

  return (
    <DragDropContextProvider onDragEnd={handleDragEnd}>
      <DroppableList droppableId="vertical-list">
        {items.map((item, index) => (
          <DraggableItem key={item.id} draggableId={item.id} index={index}>
            <div className="flex items-center">
              <span className="mr-2">⋮⋮</span>
              <span>{item.name}</span>
            </div>
          </DraggableItem>
        ))}
      </DroppableList>
    </DragDropContextProvider>
  );
}
