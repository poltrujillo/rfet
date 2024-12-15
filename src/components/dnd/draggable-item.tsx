// src/components/dnd/draggable-item.tsx
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

interface Props {
  draggableId: string;
  index: number;
  children: React.ReactNode;
}

const DraggableItem: React.FC<Props> = ({ draggableId, index, children }) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="p-4 m-2 bg-gray-200 rounded-md"
        >
          <div {...provided.dragHandleProps} className="cursor-grab">
            {children}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
