const STORAGE_KEYS = {
  FAVORITES: 'skycast_favorites',
  RECENT_SEARCHES: 'skycast_recent_searches',
  LAST_WEATHER: 'skycast_last_weather',
  LAST_FORECAST: 'skycast_last_forecast',
  UNIT: 'skycast_unit',
  THEME: 'skycast_theme',
};

const MAX_RECENT = 8;
const MAX_FAVORITES = 10;

/**
 * Get data from localStorage with JSON parsing
 */
const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * Set data in localStorage with JSON stringification
 */
const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage might be full or disabled
    console.warn('Failed to save to localStorage');
  }
};

// ===== Favorites =====
export const getFavorites = () => getItem(STORAGE_KEYS.FAVORITES, []);

export const addFavorite = (city) => {
  const favorites = getFavorites();
  const exists = favorites.some(
    (fav) => fav.name.toLowerCase() === city.name.toLowerCase() && fav.country === city.country
  );
  if (exists) return favorites;
  const updated = [city, ...favorites].slice(0, MAX_FAVORITES);
  setItem(STORAGE_KEYS.FAVORITES, updated);
  return updated;
};

export const removeFavorite = (cityName) => {
  const favorites = getFavorites();
  const updated = favorites.filter((fav) => fav.name.toLowerCase() !== cityName.toLowerCase());
  setItem(STORAGE_KEYS.FAVORITES, updated);
  return updated;
};

export const isFavorite = (cityName) => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.name.toLowerCase() === cityName.toLowerCase());
};

// ===== Recent Searches =====
export const getRecentSearches = () => getItem(STORAGE_KEYS.RECENT_SEARCHES, []);

export const addRecentSearch = (city) => {
  const recent = getRecentSearches();
  const filtered = recent.filter((r) => r.toLowerCase() !== city.toLowerCase());
  const updated = [city, ...filtered].slice(0, MAX_RECENT);
  setItem(STORAGE_KEYS.RECENT_SEARCHES, updated);
  return updated;
};

export const clearRecentSearches = () => {
  setItem(STORAGE_KEYS.RECENT_SEARCHES, []);
  return [];
};

// ===== Cached Weather Data (Offline Support) =====
export const cacheWeatherData = (weather, forecast) => {
  setItem(STORAGE_KEYS.LAST_WEATHER, { data: weather, timestamp: Date.now() });
  if (forecast) {
    setItem(STORAGE_KEYS.LAST_FORECAST, { data: forecast, timestamp: Date.now() });
  }
};

export const getCachedWeather = () => {
  const cached = getItem(STORAGE_KEYS.LAST_WEATHER);
  if (!cached) return null;
  // Cache valid for 30 minutes
  const isValid = Date.now() - cached.timestamp < 30 * 60 * 1000;
  return isValid ? cached.data : cached.data; // Return even stale data for offline
};

export const getCachedForecast = () => {
  const cached = getItem(STORAGE_KEYS.LAST_FORECAST);
  if (!cached) return null;
  return cached.data;
};

// ===== Unit Preference =====
export const getUnit = () => getItem(STORAGE_KEYS.UNIT, 'metric');

export const setUnit = (unit) => setItem(STORAGE_KEYS.UNIT, unit);

// ===== Theme Preference =====
export const getTheme = () => getItem(STORAGE_KEYS.THEME, 'dark');

export const setTheme = (theme) => setItem(STORAGE_KEYS.THEME, theme);
