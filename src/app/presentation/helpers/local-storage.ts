function isLocalStorageAvailable(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (!isLocalStorageAvailable()) return fallback;
  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : fallback;
  } catch (error) {
    console.error(`Error loading from localStorage key "${key}"`, error);
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}"`, error);
  }
}
