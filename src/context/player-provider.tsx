'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Player = {
  id: number;
  name: string;
  ranking: number;
};

interface PlayerContextType {
  players: Player[];
  addPlayer: (player: Player) => void;
  removePlayer: (id: number) => void;
  resetPlayers: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (player: Player) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]);
  };

  const removePlayer = (id: number) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.id !== id)
    );
  };

  const resetPlayers = () => {
    setPlayers([]);
  };

  return (
    <PlayerContext.Provider
      value={{ players, addPlayer, removePlayer, resetPlayers }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};
