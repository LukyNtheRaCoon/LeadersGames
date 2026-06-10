import React, { useEffect, useState } from 'react';
import { fetchSheetData } from '../utils/googleSheets';

interface PalermoStats {
  Jméno: string;
  [key: string]: string | number;
}

const Palermo: React.FC = () => {
  const [data, setData] = useState<PalermoStats[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSmqUKCHAlxxLLpWDcnXtORybXgZ5VMPGChg6xJaiLYKe1LmJQ9m27Oop-9DnERjS0edGeXZLr7xU0k/pub?gid=1354082749&single=true&output=csv';

  useEffect(() => {
    fetchSheetData<PalermoStats>(SHEET_URL)
      .then((parsedData) => {
        const filteredRows = parsedData.filter(row => row.Jméno);
        if (filteredRows.length > 0) {
          // Získat sloupce a vyfiltrovat "Role"
          const allCols = Object.keys(filteredRows[0]);
          const filteredCols = allCols.filter(col => col.toLowerCase() !== 'role');
          setColumns(filteredCols);
        }
        setData(filteredRows);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Chyba při načítání Palermo dat:', err);
        setError('Nepodařilo se načíst data pro Palermo.');
        setLoading(false);
      });
  }, []);

  const renderHeader = (col: string) => {
    if (col === 'Výhry za Mafii') return 'Výhry za killera';
    return col;
  };

  if (loading) return <p>Načítám statistiky Palermo...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="game-page">
      <h1>Palermo - Statistiky</h1>
      
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map(col => <th key={col}>{renderHeader(col)}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map(col => <td key={col}>{row[col]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && <p>Zatím zde nejsou žádná data.</p>}
    </div>
  );
};

export default Palermo;
