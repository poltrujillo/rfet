'use client';

import { PlayerList } from '@/components/player/player-list';
import {
  createMockTournament,
  // displayTournamentStructure,
} from '@/mocks/tournament';

export default function Home() {
  const mockTournament = createMockTournament();
  // displayTournamentStructure(mockTournament);

  return <PlayerList players={mockTournament.competitors} />;
}
