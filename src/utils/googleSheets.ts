import Papa from 'papaparse';

export const fetchSheetData = <T>(url: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    // Zkusit načíst z cache
    const cacheKey = `sheet_cache_${url}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        return resolve(parsed as T[]);
      } catch (e) {
        console.error("Failed to parse cached data", e);
      }
    }

    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => {
        // Uložit do cache
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(results.data));
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
