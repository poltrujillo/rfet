'use client';

import TournamentDraw from '@/components/draw/tournament-draw';
import { Tournament } from '@/models/tournament';
import { useState } from 'react';
import { Player } from '@/models/player';
import { Competitor } from '@/models/competitor';

const initialPlayers = [
  new Player('Player 1', 1),
  new Player('Player 2', 3),
  new Player('Player 3', 6),
  new Player('Player 4', 4000),
];

export default function Home() {
  const [tournament] = useState(
    new Tournament('My Tournament', initialPlayers)
  );
  const [competitors, setCompetitors] = useState<Competitor[]>(
    tournament.competitors
  );

  const handleReorganize = (newOrder: Competitor[]) => {
    setCompetitors(newOrder);
    tournament.reorganizeCompetitors(newOrder);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tennis Tournament Draw</h1>
      <TournamentDraw tournament={tournament} onReorganize={handleReorganize} />
    </div>
  );
}
