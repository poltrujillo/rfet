import { Player } from '@/models/player';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface PlayersTableProps {
  players: Player[];
  onDeletePlayer: (index: number) => void;
}

export function PlayersTable({ players, onDeletePlayer }: PlayersTableProps) {
  return (
    <div className="max-h-[400px] overflow-y-auto bg-white rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200">
            <TableHead className="text-gray-700">Name</TableHead>
            <TableHead className="text-gray-700">Ranking</TableHead>
            <TableHead className="text-gray-700">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={index} className="border-b border-gray-100">
              <TableCell className="text-gray-900">{player.name}</TableCell>
              <TableCell className="text-gray-900">{player.ranking}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeletePlayer(index)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
