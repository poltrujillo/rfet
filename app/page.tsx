'use client';

import TournamentDraw from '@/components/draw/tournament-draw';
import { Tournament } from '@/models/tournament';
import { useState } from 'react';
import { Player } from '@/models/player';
import { Competitor } from '@/models/competitor';

// Example competitors (mocked for illustration)
const initialPlayers = [
  new Player('Player 1', 1),
  new Player('Player 2', 3),
  new Player('Player 3', 6),
  new Player('Player 4', 4000),
  // Add more players as needed
];

const tournament = new Tournament('My Tournament', initialPlayers);

export default function Home() {
  const [competitors, setCompetitors] = useState<Competitor[]>(
    tournament.competitors
  );

  const handleReorganize = (newOrder: Competitor[]) => {
    setCompetitors(newOrder);
    tournament.reorganizeCompetitors(newOrder);
    tournament.start();
  };

  return (
    <div>
      <h1>Tennis Tournament Draw</h1>
      <TournamentDraw tournament={tournament} onReorganize={handleReorganize} />
    </div>
  );
}
