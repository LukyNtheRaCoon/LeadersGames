import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { motion } from 'framer-motion';
import './DailyGames.css';

interface GameSchedule {
  Datum: string;
  Hra: string;
  Cas: string;
  Popis: string;
}

const isToday = (dateStr: string) => {
  if (!dateStr) return false;
  const parts = dateStr.match(/\d+/g);
  if (parts && parts.length >= 2) {
    let day, month;
    if (dateStr.includes('-') && parts[0].length === 4) {
      // Format YYYY-MM-DD
      day = parseInt(parts[2], 10);
      month = parseInt(parts[1], 10);
    } else {
      // Format D.M.YYYY or D.M.
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
    }
    const today = new Date();
    return day === today.getDate() && month === (today.getMonth() + 1);
  }
  return false;
};

const DailyGames: React.FC = () => {
  const [games, setGames] = useState<GameSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSmqUKCHAlxxLLpWDcnXtORybXgZ5VMPGChg6xJaiLYKe1LmJQ9m27Oop-9DnERjS0edGeXZLr7xU0k/pub?gid=1869098752&single=true&output=csv";

    Papa.parse<GameSchedule>(sheetUrl, {
      download: true,
      header: true,
      complete: (results) => {
        const todaysGames = results.data.filter(game => {
          return game.Datum && game.Hra && isToday(game.Datum);
        });
        setGames(todaysGames);
        setLoading(false);
      },
      error: (err) => {
        console.error("Chyba při načítání rozvrhu:", err);
        setError("Nepodařilo se načíst rozvrh her.");
        setLoading(false);
      }
    });
  }, []);

  if (loading) return null; // Nebudeme rušit layout při načítání
  if (error) return null; // V případě chyby prostě sekci nezobrazíme
  if (games.length === 0) return null; // Pokud se dnes nic nehraje, sekci skryjeme

  return (
    <motion.div 
      className="daily-games-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="daily-games-header">
        <span className="daily-games-icon">📅</span>
        <h3>Dnes se hraje</h3>
      </div>
      <div className="daily-games-list">
        {games.map((game, index) => (
          <div key={index} className="daily-game-item">
            {game.Cas && <div className="daily-game-time">{game.Cas}</div>}
            <div className="daily-game-info">
              <h4>{game.Hra}</h4>
              {game.Popis && <p>{game.Popis}</p>}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default DailyGames;
