'use client';

import TournamentDraw from '@/components/draw/tournament-draw';
import { Tournament } from '@/models/tournament';
import { useState, useEffect } from 'react';
import { Competitor } from '@/models/competitor';
import TournamentManager from '@/services/tournament';
import { tournamentChanges } from '@/utils/events';

export default function Home() {
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);

  useEffect(() => {
    const handleTournamentSelected = (event: CustomEvent<Tournament>) => {
      const tournament = event.detail;
      setSelectedTournament(tournament);
      setCompetitors(tournament._competitors || []);
    };

    window.addEventListener(
      'tournamentSelected',
      handleTournamentSelected as EventListener
    );
    return () => {
      window.removeEventListener(
        'tournamentSelected',
        handleTournamentSelected as EventListener
      );
    };
  }, []);

  const handleReorganize = (newOrder: Competitor[]) => {
    if (selectedTournament) {
      setCompetitors(newOrder);
      selectedTournament.reorganizeCompetitors(newOrder);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {selectedTournament ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            {selectedTournament._name} Draw
          </h1>
          <TournamentDraw
            tournament={selectedTournament}
            onReorganize={handleReorganize}
          />
        </>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          Select a tournament from the sidebar to view its draw
        </div>
      )}
    </div>
  );
}
