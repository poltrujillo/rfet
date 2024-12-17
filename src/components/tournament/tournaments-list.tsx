'use client';

import { useEffect, useState } from 'react';
import { Tournament } from '@/models/tournament';
import TournamentManager from '@/services/tournament';
import { tournamentChanges } from '@/utils/events';
import { ConfirmationModal } from '../ui/confirmation-modal';
import { Trash as FaTrash } from 'lucide-react';

interface TournamentsListProps {
  tournaments: Tournament[];
}

export function TournamentsList({
  tournaments: initialTournaments,
}: TournamentsListProps) {
  const [tournaments, setTournaments] =
    useState<Tournament[]>(initialTournaments);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tournamentToDelete, setTournamentToDelete] = useState<string | null>(
    null
  );

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

  const handleDelete = (id: string) => {
    setTournamentToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (tournamentToDelete) {
      TournamentManager.removeTournament(tournamentToDelete);
      setTournaments(tournaments.filter((t) => t._id !== tournamentToDelete));
      setTournamentToDelete(null);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="text-center text-gray-500">Loading tournaments...</div>
      ) : tournaments.length === 0 ? (
        <div className="text-center text-gray-500">
          No tournaments created yet
        </div>
      ) : (
        <div className="space-y-2">
          {tournaments.map((tournament) => (
            <div
              key={tournament._id}
              className="p-2 rounded-md hover:bg-gray-100 cursor-pointer flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{tournament._name}</h3>
                <p className="text-sm text-gray-500">
                  Players:{' '}
                  {tournament._competitors?.length - tournament._byes || 0}
                </p>
              </div>
              <button
                onClick={() => handleDelete(tournament._id)}
                className="text-red-500 flex items-center"
              >
                <FaTrash className="mr-1" />
              </button>
            </div>
          ))}
        </div>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
