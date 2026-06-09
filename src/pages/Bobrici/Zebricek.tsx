import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { PlayerProfile } from '../../utils/bobriciUtils';

const Zebricek: React.FC = () => {
  const { players } = useOutletContext<{ players: PlayerProfile[] }>();

  const sortedPlayers = [...players].sort((a, b) => b.totalCompleted - a.totalCompleted);

  return (
    <div>
      <h2>Celkový žebříček Bobříků</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Pořadí</th>
            <th>Jméno</th>
            <th>Počet splněných bobříků</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, index) => (
            <tr key={player.name}>
              <td>{index + 1}.</td>
              <td>{player.name}</td>
              <td>{player.totalCompleted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Zebricek;
