import { fetchSheetData } from '../utils/googleSheets';

export interface BobrikData {
  Jméno: string;
  Popis: string;
  [key: string]: string; // Pro dynamické sloupce bobříků
}

export interface PlayerProfile {
  name: string;
  description: string;
  completedBadges: string[];
  currentTask: string | null;
  totalCompleted: number;
  rank?: number;
}

export interface BadgeDetail {
  name: string;
  story: string;
  task: string;
}

const BOBRICI_PLAYERS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSmqUKCHAlxxLLpWDcnXtORybXgZ5VMPGChg6xJaiLYKe1LmJQ9m27Oop-9DnERjS0edGeXZLr7xU0k/pub?gid=1725078774&single=true&output=csv';
const BOBRICI_UKOLY_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSmqUKCHAlxxLLpWDcnXtORybXgZ5VMPGChg6xJaiLYKe1LmJQ9m27Oop-9DnERjS0edGeXZLr7xU0k/pub?gid=669033936&single=true&output=csv';

export const getBobriciData = async () => {
  const [rawPlayers, rawUkoly] = await Promise.all([
    fetchSheetData<BobrikData>(BOBRICI_PLAYERS_URL),
    fetchSheetData<any>(BOBRICI_UKOLY_URL)
  ]);
  
  const filteredPlayers = rawPlayers.filter(row => row.Jméno);
  const allKeys = Object.keys(filteredPlayers[0] || {});
  const badgeNames = allKeys.filter(key => key !== 'Jméno' && key !== 'Popis');

  const badgeDetails: BadgeDetail[] = rawUkoly
    .filter((row: any) => row.Název)
    .map((row: any) => ({
      name: row.Název,
      story: row.Příběh || '',
      task: row.Úkol || ''
    }));

  const players: PlayerProfile[] = filteredPlayers.map(row => {
    const completedBadges: string[] = [];
    let currentTask: string | null = null;

    badgeNames.forEach(badge => {
      const status = row[badge]?.toUpperCase().trim();
      if (status === 'DONE' || status === 'ANO' || status === 'TRUE') {
        completedBadges.push(badge);
      } else if (status === 'WORKING') {
        currentTask = badge;
      }
    });

    return {
      name: row.Jméno,
      description: row.Popis || '',
      completedBadges,
      currentTask,
      totalCompleted: completedBadges.length
    };
  });

  // Výpočet ranku (pořadí)
  const sortedForRank = [...players].sort((a, b) => b.totalCompleted - a.totalCompleted);
  players.forEach(p => {
    p.rank = sortedForRank.findIndex(s => s.name === p.name) + 1;
  });

  return {
    players,
    badgeNames,
    badgeDetails
  };
};
