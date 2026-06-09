import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { getBobriciData, PlayerProfile } from '../../utils/bobriciUtils';

const BobriciLayout: React.FC = () => {
  const [data, setData] = useState<{ players: PlayerProfile[]; badgeNames: string[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    getBobriciData().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Načítám data o bobřících...</p>;

  return (
    <div className="bobrici-container">
      <h1>Bobříci</h1>
      <nav className="sub-nav">
        <NavLink to="ukoly" end>Seznam úkolů</NavLink>
        <NavLink to="hraci">Seznam hráčů</NavLink>
        <NavLink to="zebricek">Žebříček</NavLink>
      </nav>
      <div className="bobrici-content">
        {/* Předáme data do Outletu přes context, aby k nim měly přístup podstránky */}
        <Outlet context={data} />
      </div>
    </div>
  );
};

export default BobriciLayout;
