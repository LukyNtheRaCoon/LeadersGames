import Papa from 'papaparse';

export const fetchSheetData = <T>(url: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    // Zkusit načíst z cache
    const cacheKey = `sheet_cache_${url}`;
    const cachedItem = sessionStorage.getItem(cacheKey);
    
    if (cachedItem) {
      try {
        const parsedItem = JSON.parse(cachedItem);
        const now = new Date().getTime();
        // 60000 ms = 1 minuta
        if (parsedItem.timestamp && (now - parsedItem.timestamp < 60000)) {
          return resolve(parsedItem.data as T[]);
        }
      } catch (e) {
        console.error("Failed to parse cached data", e);
      }
    }

    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => {
        // Uložit do cache s timestampem
        try {
          const cacheData = {
            timestamp: new Date().getTime(),
            data: results.data
          };
          sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
        } catch (e) {
          console.error("Failed to save to cache", e);
        }
        resolve(results.data as T[]);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
};
