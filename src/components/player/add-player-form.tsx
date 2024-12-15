'use client';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface AddPlayerFormProps {
  newPlayerName: string;
  newPlayerRanking: string;
  onNameChange: (value: string) => void;
  onRankingChange: (value: string) => void;
  onAddPlayer: () => void;
}

export function AddPlayerForm({
  newPlayerName,
  newPlayerRanking,
  onNameChange,
  onRankingChange,
  onAddPlayer,
}: AddPlayerFormProps) {
  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Player name"
        value={newPlayerName}
        onChange={(e) => onNameChange(e.target.value)}
        className="bg-white text-gray-900 border-gray-200"
      />
      <Input
        type="number"
        placeholder="Ranking"
        value={newPlayerRanking}
        onChange={(e) => onRankingChange(e.target.value)}
        className="bg-white text-gray-900 border-gray-200"
      />
      <Button onClick={onAddPlayer}>Add</Button>
    </div>
  );
}
