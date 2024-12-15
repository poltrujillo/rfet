'use client';

import { reorderList } from '@/utils/list-manager';
import { DropResult } from '@hello-pangea/dnd';
import { useState } from 'react';
import DroppableList from '@/components/dnd/droppable-list';
import DraggableItem from '@/components/dnd/draggable-item';
import DragDropContextProvider from '@/context/drag-drop-provider';
import { Player } from '@/models/player';

interface PlayerListProps {
  players: Player[];
}

export function PlayerList({ players }: PlayerListProps) {
  const [items, setItems] = useState<Player[]>(players);
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return; // Ignore drop outside list

    setItems((prevItems) =>
      reorderList(prevItems, source.index, destination.index)
    );
  };

  return (
    <DragDropContextProvider onDragEnd={handleDragEnd}>
      <DroppableList droppableId="vertical-list">
        {items.map((item, index) => (
          <DraggableItem key={item.id} draggableId={item.id} index={index}>
            {item.name}
          </DraggableItem>
        ))}
      </DroppableList>
    </DragDropContextProvider>
  );
}
