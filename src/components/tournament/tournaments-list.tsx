import { Tournament } from '@/models/tournament';

interface TournamentsListProps {
  tournaments: Tournament[];
}

export function TournamentsList({ tournaments }: TournamentsListProps) {
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
          key={tournament.id}
          className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
        >
          <h3 className="font-medium">{tournament.name}</h3>
          <p className="text-sm text-gray-500">
            Players: {tournament.competitors.length}
          </p>
        </div>
      ))}
    </div>
  );
}
