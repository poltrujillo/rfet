'use client';

import { useState } from 'react';
import { usePlayerContext } from '@/context/player-provider';
import { Button } from '../common/button';
import { Input } from '../common/input';

export const AddPlayerForm = () => {
  const { addPlayer, resetPlayers } = usePlayerContext();

  const [name, setName] = useState('');
  const [ranking, setRanking] = useState('');
  const [idCounter, setIdCounter] = useState(1);

  const handleAddPlayer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (name && ranking) {
      addPlayer({ id: idCounter, name, ranking: Number(ranking) });
      setIdCounter(idCounter + 1);
      setName('');
      setRanking('');
    }
  };

  return (
    <form className="flex-col flex h-full w-full gap-3 justify-center items-center">
      <h2 className="text-2xl font-semibold text-slate-200">Add Player</h2>
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Ranking"
        value={ranking}
        onChange={(e) => setRanking(e.target.value)}
      />
      <Button
        label="Add Player"
        primary={true}
        onClickEvent={handleAddPlayer}
      />
      <Button
        label="Reset Players"
        primary={false}
        onClickEvent={(e) => {
          e.preventDefault();
          resetPlayers();
          setIdCounter(1);
        }}
      />
    </form>
  );
};
