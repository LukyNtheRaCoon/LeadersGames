import React from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import type { PlayerProfile } from '../../utils/bobriciUtils';

const HracDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { players } = useOutletContext<{ players: PlayerProfile[] }>();

  const player = players.find(p => p.name === decodeURIComponent(id || ''));

  if (!player) return <p>Hráč nebyl nalezen.</p>;

  return (
    <div className="player-profile">
      <h2>Profil hráče: {player.name}</h2>
      <div className="profile-info">
        <p><strong>Popis:</strong> {player.description || 'Bez popisu'}</p>
        <p><strong>Celkem splněno:</strong> {player.totalCompleted} bobříků</p>
      </div>

      <h3>Splnění bobříci:</h3>
      <div className="completed-badges">
        {player.completedBadges.length > 0 ? (
          player.completedBadges.map(badge => (
            <span key={badge} className="badge-tag">{badge}</span>
          ))
        ) : (
          <p>Tento hráč zatím nesplnil žádného bobříka.</p>
        )}
      </div>
    </div>
  );
};

export default HracDetail;
