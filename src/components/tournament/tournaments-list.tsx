'use client';

import { useEffect, useState } from 'react';
import { Tournament } from '@/models/tournament';
import TournamentManager from '@/services/tournament';
import { tournamentChanges } from '@/utils/events';

interface TournamentsListProps {
  tournaments: Tournament[];
}

export function TournamentsList({
  tournaments: initialTournaments,
}: TournamentsListProps) {
  const [tournaments, setTournaments] =
    useState<Tournament[]>(initialTournaments);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        setIsLoading(true);
        const loadedTournaments = TournamentManager.getAllTournaments();

        setTournaments(loadedTournaments);
      } finally {
        setIsLoading(false);
      }
    };

    loadTournaments();
    const unsubscribe = tournamentChanges.subscribe(loadTournaments);

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="text-center text-gray-500">Loading tournaments...</div>
    );
  }

  if (tournaments.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No tournaments created yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tournaments.map((tournament) => (
        <div
          key={tournament._id}
          className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
        >
          <h3 className="font-medium">{tournament._name}</h3>
          <p className="text-sm text-gray-500">
            Players: {tournament._competitors?.length - tournament._byes || 0}
          </p>
        </div>
      ))}
    </div>
  );
}
