import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import type { PlayerProfile } from '../../utils/bobriciUtils';

const Hraci: React.FC = () => {
  const { players } = useOutletContext<{ players: PlayerProfile[] }>();

  return (
    <div>
      <h2>Seznam hráčů</h2>
      <div className="players-grid">
        {players.map((player) => (
          <Link to={`/bobrici/hraci/${encodeURIComponent(player.name)}`} key={player.name} className="player-link-card">
            <h3>{player.name}</h3>
            <p>Počet bobříků: {player.totalCompleted}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hraci;
