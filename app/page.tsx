'use client';

import { PlayerList } from '@/components/player/player-list';
import { createMockTournament } from '@/mocks/tournament';
import { Player } from '@/models/player';

export default function Home() {
  const mockTournament = createMockTournament();

  // Octavos (4 Bye's):
  mockTournament.setWinner(1, 1, mockTournament.competitors[3] as Player);
  mockTournament.setWinner(1, 4, mockTournament.competitors[8] as Player);
  mockTournament.setWinner(1, 6, mockTournament.competitors[12] as Player);
  mockTournament.setWinner(1, 7, mockTournament.competitors[15] as Player);

  // Quarter finals
  mockTournament.setWinner(2, 0, mockTournament.competitors[3] as Player);
  mockTournament.setWinner(2, 1, mockTournament.competitors[6] as Player);
  mockTournament.setWinner(2, 2, mockTournament.competitors[8] as Player);
  mockTournament.setWinner(2, 3, mockTournament.competitors[12] as Player);

  // Semifinals:
  mockTournament.setWinner(3, 0, mockTournament.competitors[3] as Player);
  mockTournament.setWinner(3, 1, mockTournament.competitors[12] as Player);

  mockTournament.setWinner(4, 0, mockTournament.competitors[3] as Player);

  console.log(mockTournament);

  return <PlayerList players={mockTournament.competitors} />;
}
