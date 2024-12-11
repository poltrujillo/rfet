'use client';

import { usePlayerContext } from '@/context/player-provider';
import { Button } from '../common/button';
import { TrashIcon } from '@heroicons/react/24/outline';

export function PlayerList() {
  const { players, removePlayer } = usePlayerContext();

  return (
    <div className="max-w-lg w-full h-5/6 overflow-y-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      {players.map((player) => (
        <div
          key={player.id}
          className="flex justify-between items-center p-3 bg-gray-100 rounded-md mb-3"
        >
          <div className="flex items-center gap-3">
            <span className="text-md font-semibold text-gray-700">
              {player.name}
            </span>
            <span className="text-sm text-gray-500">
              Ranking: {player.ranking}
            </span>
          </div>
          <TrashIcon
            className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700"
            onClick={() => removePlayer(player.id)}
          />
        </div>
      ))}
      <div className="mt-4 flex justify-center">
        <Button
          label="Create Tournament"
          primary={true}
          onClickEvent={() => {
            console.log('Button clicked');
          }}
        />
      </div>
    </div>
  );
}
