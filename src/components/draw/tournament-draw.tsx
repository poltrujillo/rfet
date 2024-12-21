import React, { useEffect, useState } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import PlayerItem from './player-item';
import { Competitor } from '@/models/competitor';
import DroppableList from '../dnd/droppable-list';
import DraggableItem from '../dnd/draggable-item';
import DragDropContextProvider from '@/context/drag-drop-provider';
import { Tournament } from '@/models/tournament';
import { Button } from '../ui/button';
import { Player } from '@/models/player';
import { Bye } from '@/models/bye';

interface TournamentDrawProps {
  tournament: Tournament;
  onReorganize: (newOrder: Competitor[]) => void;
}

const TournamentDraw: React.FC<TournamentDrawProps> = ({
  tournament,
  onReorganize,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [isTournamentStarted, setIsTournamentStarted] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Add this to force re-renders
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

  const handleStart = () => {
    tournament.start();
    setIsTournamentStarted(true);
  };

  const handleWinnerSelect = (
    roundIndex: number,
    matchIndex: number,
    winner: Player
  ) => {
    try {
      tournament.setWinner(roundIndex + 1, matchIndex, winner);
      setRefreshKey((prev) => prev + 1); // Force re-render
    } catch (error) {
      console.error('Error setting winner:', error);
    }
  };

  if (!isClient) return null;

  return (
    <div className="space-y-4" key={refreshKey}>
      {!isTournamentStarted ? (
        <>
          <DragDropContextProvider onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 gap-4">
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
          <Button
            onClick={handleStart}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Start Tournament
          </Button>
        </>
      ) : (
        <div className="space-y-6">
          {tournament._rounds.map((round, roundIndex) => (
            <div
              key={`${round._id}-${refreshKey}`}
              className="border rounded-lg p-4"
            >
              <h3 className="text-lg font-bold mb-4">{round._roundType}</h3>
              <div className="space-y-4">
                {round.matches.map((match, matchIndex) => (
                  <div
                    key={`${match._id}-${refreshKey}`}
                    className={`p-4 rounded-lg border transition-all ${
                      match.isComplete
                        ? 'bg-green-50 border-green-500'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="space-y-2">
                      {match.player1 && (
                        <div
                          className={`p-2 rounded cursor-pointer transition-all ${
                            match.winner === match.player1
                              ? 'bg-green-200 font-bold'
                              : match.isComplete
                              ? 'opacity-50'
                              : 'hover:bg-gray-100'
                          } ${
                            match.player1 instanceof Bye
                              ? 'italic opacity-50'
                              : ''
                          }`}
                          onClick={() => {
                            if (
                              !match.isComplete &&
                              match.player1 instanceof Player
                            ) {
                              handleWinnerSelect(
                                roundIndex,
                                matchIndex,
                                match.player1
                              );
                            }
                          }}
                        >
                          {match.player1._name}
                          {match.player1 instanceof Bye && ' (Bye)'}
                        </div>
                      )}
                      <div className="text-center font-bold">vs</div>
                      {match.player2 && (
                        <div
                          className={`p-2 rounded cursor-pointer transition-all ${
                            match.winner === match.player2
                              ? 'bg-green-200 font-bold'
                              : match.isComplete
                              ? 'opacity-50'
                              : 'hover:bg-gray-100'
                          } ${
                            match.player2 instanceof Bye
                              ? 'italic opacity-50'
                              : ''
                          }`}
                          onClick={() => {
                            if (
                              !match.isComplete &&
                              match.player2 instanceof Player
                            ) {
                              handleWinnerSelect(
                                roundIndex,
                                matchIndex,
                                match.player2
                              );
                            }
                          }}
                        >
                          {match.player2._name}
                          {match.player2 instanceof Bye && ' (Bye)'}
                        </div>
                      )}
                      {match.isComplete && (
                        <div className="text-sm text-green-600 mt-2 font-semibold">
                          Winner: {match.winner?._name}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {round.isComplete() &&
                roundIndex < tournament._rounds.length - 1 && (
                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={() => setRefreshKey((prev) => prev + 1)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Next Round →
                    </Button>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TournamentDraw;
