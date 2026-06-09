import React from 'react';
import { useOutletContext } from 'react-router-dom';
import type { BadgeDetail } from '../../utils/bobriciUtils';

const Ukoly: React.FC = () => {
  const { badgeDetails, badgeNames } = useOutletContext<{ badgeDetails: BadgeDetail[], badgeNames: string[] }>();

  // Pokud úkol není v seznamu detailů, vytvoříme pro něj aspoň základní kartu
  const allBadges = badgeNames.map(name => {
    const detail = badgeDetails.find(d => d.name === name);
    return detail || { name, story: 'Tento bobřík čeká na svůj příběh...', task: 'Úkol zatím nebyl definován.' };
  });

  return (
    <div className="ukoly-page">
      <h2>Seznam bobříků a jejich zkoušek</h2>
      <p className="page-intro">Zde najdeš legendy starých lovců a podmínky pro získání jednotlivých bobříků.</p>
      
      <div className="ukoly-list">
        {allBadges.map((badge) => (
          <div key={badge.name} className="ukol-card">
            <div className="ukol-header">
              <div className="ukol-badge-icon">🦫</div>
              <h3 className="ukol-name">{badge.name}</h3>
            </div>
            
            <div className="ukol-body">
              <div className="ukol-story">
                <h4>Příběhové zasazení</h4>
                <p>{badge.story}</p>
              </div>
              
              <div className="ukol-task-box">
                <h4>Samotný úkol</h4>
                <p>{badge.task}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ukoly;
