'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from './button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import TournamentManager from '@/services/tournament';
import { Tournament } from '@/models/tournament';
import { Player } from '@/models/player';
import { TournamentsList } from '../tournament/tournaments-list';
import { AddPlayerForm } from '../player/add-player-form';
import { PlayersTable } from '../player/players-table';

export function AppSidebar() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [newPlayerRanking, setNewPlayerRanking] = useState<number>(0);
  const [tournamentName, setTournamentName] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const loadedTournaments = TournamentManager.getAllTournaments();
    setTournaments(loadedTournaments);
  }, []);

  const handleAddPlayer = () => {
    if (newPlayerName && newPlayerRanking) {
      const newPlayer = new Player(newPlayerName, newPlayerRanking);
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
      setNewPlayerRanking(0);
    }
  };

  const handleDeletePlayer = (index: number) => {
    const newPlayers = players.filter((_, i) => i !== index);
    setPlayers(newPlayers);
  };

  const handleCreateTournament = () => {
    if (tournamentName && players.length > 0) {
      const newTournament = new Tournament(tournamentName, players);
      TournamentManager.addTournament(newTournament);
      setTournaments([...tournaments, newTournament]);
      setTournamentName('');
      setPlayers([]);
      setIsDialogOpen(false);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="font-bold">Tournaments</SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <TournamentsList tournaments={tournaments} />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mb-4">New Tournament</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                Manage Players
              </DialogTitle>
              <DialogDescription>
                Add players and create a new tournament.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <AddPlayerForm
                newPlayerName={newPlayerName}
                newPlayerRanking={newPlayerRanking}
                onNameChange={setNewPlayerName}
                onRankingChange={setNewPlayerRanking}
                onAddPlayer={handleAddPlayer}
              />
              <PlayersTable
                players={players}
                onDeletePlayer={handleDeletePlayer}
              />
              <input
                type="text"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                placeholder="Tournament Name"
                className="border p-2"
              />
              <Button onClick={handleCreateTournament}>
                Create Tournament
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </SidebarContent>
    </Sidebar>
  );
}
