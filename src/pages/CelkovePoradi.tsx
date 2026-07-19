import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { fetchSheetData, isPlayerActive } from '../utils/googleSheets';
import { getBobriciData } from '../utils/bobriciUtils';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

interface TotalScore {
  name: string;
  bobrici: number;
  kissingKiller: number;
  palermoSurvivor: number;
  palermoKiller: number;
  total: number;
  active: boolean;
}

const KISSING_KILLER_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSmqUKCHAlxxLLpWDcnXtORybXgZ5VMPGChg6xJaiLYKe1LmJQ9m27Oop-9DnERjS0edGeXZLr7xU0k/pub?output=csv';
const PALERMO_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSmqUKCHAlxxLLpWDcnXtORybXgZ5VMPGChg6xJaiLYKe1LmJQ9m27Oop-9DnERjS0edGeXZLr7xU0k/pub?gid=1354082749&single=true&output=csv';

const CelkovePoradi: React.FC = () => {
  const [data, setData] = useState<TotalScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bobriciData, kissingKillerData, palermoData] = await Promise.all([
          getBobriciData(),
          fetchSheetData<any>(KISSING_KILLER_URL),
          fetchSheetData<any>(PALERMO_URL)
        ]);

        const playersMap = new Map<string, TotalScore>();

        // Zpracování Bobříků
        bobriciData.players.forEach(player => {
          if (player.name) {
            playersMap.set(player.name.trim(), {
              name: player.name.trim(),
              bobrici: player.totalCompleted,
              kissingKiller: 0,
              palermoSurvivor: 0,
              palermoKiller: 0,
              total: 0,
              active: true
            });
          }
        });

        // Zpracování Kissing Killer
        kissingKillerData.forEach(row => {
          const name = row['Jméno']?.trim();
          if (name) {
            if (!playersMap.has(name)) {
              playersMap.set(name, { name, bobrici: 0, kissingKiller: 0, palermoSurvivor: 0, palermoKiller: 0, total: 0, active: isPlayerActive(row) });
            }
            const p = playersMap.get(name)!;
            p.kissingKiller = Number(row['Vítězství']) || 0;
            // Aktualizace stavu aktivity, pokud je v KK uveden jako neaktivní
            if (!isPlayerActive(row)) p.active = false;
          }
        });

        // Zpracování Palermo
        palermoData.forEach(row => {
          const name = row['Jméno']?.trim();
          if (name) {
            if (!playersMap.has(name)) {
              playersMap.set(name, { name, bobrici: 0, kissingKiller: 0, palermoSurvivor: 0, palermoKiller: 0, total: 0, active: isPlayerActive(row) });
            }
            const p = playersMap.get(name)!;
            p.palermoSurvivor = Number(row['Počet přežití']) || 0;
            const killerWins = Number(row['Výhry za killera']) || Number(row['Výhry za Mafii']) || 0;
            p.palermoKiller = killerWins;
          }
        });

        // Výpočet celkových bodů
        const scores = Array.from(playersMap.values()).map(p => {
          p.total = p.bobrici + p.kissingKiller + p.palermoSurvivor + (p.palermoKiller * 3);
          return p;
        });

        // Seřadit sestupně podle celkových bodů
        scores.sort((a, b) => b.total - a.total);

        setData(scores);
        setLoading(false);
      } catch (err) {
        console.error('Chyba při načítání celkového pořadí:', err);
        setError('Nepodařilo se načíst data pro celkové pořadí.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <motion.p initial="hidden" animate="visible" variants={itemVariants}>Načítám celkové pořadí...</motion.p>;
  if (error) return <motion.p className="error" initial="hidden" animate="visible" variants={itemVariants}>{error}</motion.p>;

  return (
    <div className="game-page">
      <h1>Celkové Pořadí</h1>
      <p className="page-intro" style={{ marginBottom: '2rem' }}>
        Tato tabulka sčítá body ze všech her: Bobříci (1 bod), Kissing Killer vítězství (1 bod), Palermo přežití (1 bod), Palermo výhra za killera (3 body).
      </p>

      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div variants={itemVariants} className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Pořadí</th>
                <th>Jméno</th>
                <th>Bobříci</th>
                <th>Kissing Killer</th>
                <th>Palermo (Přežití)</th>
                <th>Palermo (Killer)</th>
                <th>Celkem bodů</th>
              </tr>
            </thead>
            <tbody>
              {data.map((player, index) => (
                <tr key={index} className={!player.active ? 'player-inactive' : ''}>
                  <td>{index + 1}.</td>
                  <td>
                    <span className="player-name-cell">
                      {player.name}
                      {!player.active && <span className="status-badge inactive">Nepřítomen</span>}
                    </span>
                  </td>
                  <td>{player.bobrici}</td>
                  <td>{player.kissingKiller}</td>
                  <td>{player.palermoSurvivor}</td>
                  <td>{player.palermoKiller}</td>
                  <td style={{ fontWeight: 'bold', color: '#646cff', fontSize: '1.1em' }}>{player.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {data.length === 0 && <motion.p variants={itemVariants}>Zatím zde nejsou žádná data.</motion.p>}
      </motion.div>
    </div>
  );
};

export default CelkovePoradi;
