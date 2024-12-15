'use client';

import { PlayerList } from '@/components/player/player-list';
import { Player } from '@/models/player';

export default function Home() {
  const mockPlayers = [
    new Player('John Doe', 25),
    new Player('Jane Smith', 75),
    new Player('Bob Johnson', 200),
    new Player('Alice Williams', 450),
    new Player('Mike Brown', 750),
  ];

  return <PlayerList players={mockPlayers} />;
}
