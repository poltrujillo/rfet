import React from 'react';

interface PlayerItemProps {
  name: string;
}

const PlayerItem: React.FC<PlayerItemProps> = ({ name }) => {
  return (
    <div className="w-full p-1 text-center text-xs bg-gray-100 rounded shadow-sm">
      {name}
    </div>
  );
};

export default PlayerItem;
