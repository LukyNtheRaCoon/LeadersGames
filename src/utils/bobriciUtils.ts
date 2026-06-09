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
  totalCompleted: number;
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
  
  // Odfiltrovat prázdné řádky u hráčů
  const filteredPlayers = rawPlayers.filter(row => row.Jméno);

  // Získat názvy všech bobříků z hlavního listu (všechny sloupce kromě Jméno a Popis)
  const allKeys = Object.keys(filteredPlayers[0] || {});
  const badgeNames = allKeys.filter(key => key !== 'Jméno' && key !== 'Popis');

  // Zpracovat detaily úkolů
  const badgeDetails: BadgeDetail[] = rawUkoly
    .filter((row: any) => row.Název)
    .map((row: any) => ({
      name: row.Název,
      story: row.Příběh || '',
      task: row.Úkol || ''
    }));

  const players: PlayerProfile[] = filteredPlayers.map(row => {
    const completedBadges = badgeNames.filter(badge => {
      const val = row[badge]?.toUpperCase();
      return val === 'ANO' || val === 'X' || val === 'TRUE' || val === '1';
    });

    return {
      name: row.Jméno,
      description: row.Popis || '',
      completedBadges,
      totalCompleted: completedBadges.length
    };
  });

  return {
    players,
    badgeNames,
    badgeDetails
  };
};
