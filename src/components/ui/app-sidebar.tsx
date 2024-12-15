'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  const tournaments: Tournament[] = TournamentManager.getAllTournaments();
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerRanking, setNewPlayerRanking] = useState('');

  const handleAddPlayer = () => {
    if (newPlayerName && newPlayerRanking) {
      const newPlayer = new Player(newPlayerName, parseInt(newPlayerRanking));
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
      setNewPlayerRanking('');
    }
  };

  const handleDeletePlayer = (index: number) => {
    const newPlayers = players.filter((_, i) => i !== index);
    setPlayers(newPlayers);
  };

  return (
    <Sidebar>
      <SidebarHeader className="font-bold">Create Tournament 🎾</SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <TournamentsList tournaments={tournaments} />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full mb-4">Manage Players</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                Manage Players
              </DialogTitle>
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
            </div>
          </DialogContent>
        </Dialog>
      </SidebarContent>
    </Sidebar>
  );
}
