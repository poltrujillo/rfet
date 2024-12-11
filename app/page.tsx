'use client';

import DraggableItem from '@/components/dnd/draggable-item';
import DroppableList from '@/components/dnd/droppable-list';
import DragDropContextProvider from '@/context/drag-drop-provider';
import { reorderList } from '@/utils/list-manager';
import { useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
  ]);

  const handleDragEnd = (result: any) => {
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
            {item.content}
          </DraggableItem>
        ))}
      </DroppableList>
    </DragDropContextProvider>
  );
}
