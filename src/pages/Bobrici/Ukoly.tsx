import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Ukoly: React.FC = () => {
  const { badgeNames } = useOutletContext<{ badgeNames: string[] }>();

  return (
    <div>
      <h2>Seznam dostupných bobříků</h2>
      <div className="badges-list">
        {badgeNames.map((badge) => (
          <div key={badge} className="badge-card">
            <h3>{badge}</h3>
            <p>Tento úkol můžete splnit a získat tak bobříka {badge}.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ukoly;
