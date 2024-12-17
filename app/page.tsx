'use client';

import TournamentDraw from '@/components/draw/tournament-draw';
import { Tournament } from '@/models/tournament';
import { useState } from 'react';

// Example competitors (mocked for illustration)
const initialPlayers = [
  { id: '1', name: 'Player 1' },
  { id: '2', name: 'Player 2' },
  { id: '3', name: 'Player 3' },
  { id: '4', name: 'Player 4' },
  { id: '5', name: 'Player 4' },
  { id: '6', name: 'Player 4' },
  { id: '7', name: 'Player 4' },
  { id: '8', name: 'Player 4' },
];

const tournament = new Tournament('My Tournament', initialPlayers);

export default function Home() {
  const [competitors, setCompetitors] = useState(tournament.competitors);

  const handleReorganize = (newOrder: typeof competitors) => {
    setCompetitors(newOrder);
  };

  return (
    <div>
      <TournamentDraw
        competitors={competitors}
        onReorganize={handleReorganize}
      />
    </div>
  );
}
