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
          <Link to={`/bobrici/hraci/${encodeURIComponent(player.name)}`} key={player.name} className="player-progress-card">
            <div className="player-rank">
              <span className="rank-label">Pozice</span>
              <span className="rank-number">#{player.rank}</span>
            </div>
            
            <div className="player-main-info">
              <h3 className="player-name">{player.name}</h3>
              <div className="player-stats">
                <div className="stat-item">
                  <span className="stat-label">Splněno</span>
                  <span className="stat-value">{player.totalCompleted}</span>
                </div>
                <div className="stat-item working-on">
                  <span className="stat-label">Aktuálně pracuje na</span>
                  <span className="stat-value">
                    {player.currentTask ? (
                      <span className="working-badge">{player.currentTask}</span>
                    ) : (
                      <span className="no-task">Bez úkolu</span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="player-card-arrow">→</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hraci;
