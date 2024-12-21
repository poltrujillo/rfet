import React, { useEffect, useState } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import PlayerItem from './player-item';
import { Competitor } from '@/models/competitor';
import DroppableList from '../dnd/droppable-list';
import DraggableItem from '../dnd/draggable-item';
import DragDropContextProvider from '@/context/drag-drop-provider';
import { Tournament } from '@/models/tournament';

interface TournamentDrawProps {
  tournament: Tournament;
  onReorganize: (newOrder: Competitor[]) => void;
}

const TournamentDraw: React.FC<TournamentDrawProps> = ({
  tournament,
  onReorganize,
}) => {
  const [isClient, setIsClient] = useState(false);
  const competitors = tournament._competitors || [];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(competitors);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    onReorganize(reordered);
  };

  if (!isClient) {
    return null;
  }

  return (
    <DragDropContextProvider onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DroppableList droppableId="tournament-bracket">
          {competitors.map((competitor, index) => (
            <DraggableItem
              key={competitor._id}
              draggableId={competitor._id}
              index={index}
            >
              <PlayerItem name={competitor._name} />
            </DraggableItem>
          ))}
        </DroppableList>
      </div>
    </DragDropContextProvider>
  );
};

export default TournamentDraw;
