import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import type { PlayerProfile } from '../../utils/bobriciUtils';

const Hraci: React.FC = () => {
  const { players } = useOutletContext<{ players: PlayerProfile[] }>();

  return (
    <div className="players-page">
      <h2>Přehled hráčů a jejich postupu</h2>
      <div className="players-list">
        {players.map((player) => (
          <Link to={`/bobrici/hraci/${encodeURIComponent(player.name)}`} key={player.name} className="player-row-card">
            <div className="row-name">{player.name}</div>
            
            <div className="row-stats">
              <div className="row-stat">
                <span className="row-label">Splněno:</span>
                <span className="row-value">{player.totalCompleted}</span>
              </div>
              
              <div className="row-stat row-working">
                <span className="row-label">Pracuje na:</span>
                <span className="row-value">
                  {player.currentTask ? (
                    <span className="working-pill">{player.currentTask}</span>
                  ) : (
                    <span className="no-task-pill">Nic</span>
                  )}
                </span>
              </div>
            </div>

            <div className="row-rank-right">
              <span className="rank-label-small">Pozice</span>
              <span className="rank-number-big">#{player.rank}</span>
            </div>
            
            <div className="row-arrow">→</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hraci;
