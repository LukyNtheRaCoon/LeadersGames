import React, { useEffect, useState } from 'react';
import { fetchSheetData } from '../utils/googleSheets';

interface PlayerScore {
  Jméno: string;
  Vítězství: string | number;
}

const KissingKiller: React.FC = () => {
  const [data, setData] = useState<PlayerScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSmqUKCHAlxxLLpWDcnXtORybXgZ5VMPGChg6xJaiLYKe1LmJQ9m27Oop-9DnERjS0edGeXZLr7xU0k/pub?output=csv';

  useEffect(() => {
    fetchSheetData<PlayerScore>(SHEET_URL)
      .then((parsedData) => {
        // Seřadit podle vítězství sestupně
        const sortedData = parsedData
          .filter(row => row.Jméno) // Odstranit prázdné řádky
          .sort((a, b) => Number(b.Vítězství) - Number(a.Vítězství));
        setData(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Chyba při načítání dat:', err);
        setError('Nepodařilo se načíst data z tabulky.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Načítám žebříček...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="game-page">
      <h1>Kissing Killer - Žebříček</h1>
      
      <table className="data-table">
        <thead>
          <tr>
            <th>Pořadí</th>
            <th>Jméno</th>
            <th>Počet vítězství</th>
          </tr>
        </thead>
        <tbody>
          {data.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>{player.Jméno}</td>
              <td>{player.Vítězství}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && <p>Zatím zde nejsou žádná data.</p>}
    </div>
  );
};

export default KissingKiller;
