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

const BOBRICI_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSmqUKCHAlxxLLpWDcnXtORybXgZ5VMPGChg6xJaiLYKe1LmJQ9m27Oop-9DnERjS0edGeXZLr7xU0k/pub?gid=1725078774&single=true&output=csv';

export const getBobriciData = async () => {
  const rawData = await fetchSheetData<BobrikData>(BOBRICI_URL);
  
  // Odfiltrovat prázdné řádky
  const filteredData = rawData.filter(row => row.Jméno);

  // Získat názvy všech bobříků (všechny sloupce kromě Jméno a Popis)
  const allKeys = Object.keys(filteredData[0] || {});
  const badgeNames = allKeys.filter(key => key !== 'Jméno' && key !== 'Popis');

  const players: PlayerProfile[] = filteredData.map(row => {
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
    badgeNames
  };
};
