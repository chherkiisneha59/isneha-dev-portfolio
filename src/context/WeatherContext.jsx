import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  getCurrentWeather,
  getForecast,
  getWeatherByCoords,
  getForecastByCoords,
} from '../services/weatherApi';
import {
  getUnit,
  setUnit as saveUnit,
  getFavorites,
  addFavorite as addFav,
  removeFavorite as removeFav,
  isFavorite as checkFavorite,
  getRecentSearches,
  addRecentSearch,
  clearRecentSearches as clearRecent,
  cacheWeatherData,
  getCachedWeather,
  getCachedForecast,
} from '../utils/storage';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnitState] = useState(() => getUnit());
  const [favorites, setFavorites] = useState(() => getFavorites());
  const [recentSearches, setRecentSearches] = useState(() => getRecentSearches());

  // Load cached data on mount
  useEffect(() => {
    const cachedWeather = getCachedWeather();
    const cachedForecast = getCachedForecast();
    if (cachedWeather) setWeather(cachedWeather);
    if (cachedForecast) setForecast(cachedForecast);
  }, []);

  /**
   * Search weather by city name
   */
  const searchByCity = useCallback(
    async (city) => {
      if (!city?.trim()) return;
      setLoading(true);
      setError(null);

      const [weatherResult, forecastResult] = await Promise.all([
        getCurrentWeather(city.trim(), unit),
        getForecast(city.trim(), unit),
      ]);

      if (weatherResult.error) {
        setError(weatherResult.error);
        setLoading(false);
        return;
      }

      setWeather(weatherResult.data);
      setForecast(forecastResult.data);
      cacheWeatherData(weatherResult.data, forecastResult.data);
      setRecentSearches(addRecentSearch(weatherResult.data.name));
      setLoading(false);
    },
    [unit]
  );

  /**
   * Search weather by coordinates
   */
  const searchByCoords = useCallback(
    async (lat, lon) => {
      setLoading(true);
      setError(null);

      const [weatherResult, forecastResult] = await Promise.all([
        getWeatherByCoords(lat, lon, unit),
        getForecastByCoords(lat, lon, unit),
      ]);

      if (weatherResult.error) {
        setError(weatherResult.error);
        setLoading(false);
        return;
      }

      setWeather(weatherResult.data);
      setForecast(forecastResult.data);
      cacheWeatherData(weatherResult.data, forecastResult.data);
      setRecentSearches(addRecentSearch(weatherResult.data.name));
      setLoading(false);
    },
    [unit]
  );

  /**
   * Toggle temperature unit and re-fetch
   */
  const toggleUnit = useCallback(async () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnitState(newUnit);
    saveUnit(newUnit);

    if (weather?.name) {
      setLoading(true);
      const [weatherResult, forecastResult] = await Promise.all([
        getCurrentWeather(weather.name, newUnit),
        getForecast(weather.name, newUnit),
      ]);

      if (!weatherResult.error) {
        setWeather(weatherResult.data);
        setForecast(forecastResult.data);
        cacheWeatherData(weatherResult.data, forecastResult.data);
      }
      setLoading(false);
    }
  }, [unit, weather]);

  /**
   * Add city to favorites
   */
  const addFavorite = useCallback(
    (city) => {
      if (!city) return;
      const cityData = {
        name: city.name || city,
        country: city.sys?.country || city.country || '',
        lat: city.coord?.lat || city.lat,
        lon: city.coord?.lon || city.lon,
      };
      const updated = addFav(cityData);
      setFavorites(updated);
    },
    []
  );

  /**
   * Remove city from favorites
   */
  const removeFavorite = useCallback((cityName) => {
    const updated = removeFav(cityName);
    setFavorites(updated);
  }, []);

  /**
   * Clear recent searches
   */
  const clearRecentSearches = useCallback(() => {
    setRecentSearches(clearRecent());
  }, []);

  /**
   * Clear error
   */
  const clearError = useCallback(() => setError(null), []);

  const value = {
    weather,
    forecast,
    loading,
    error,
    unit,
    favorites,
    recentSearches,
    searchByCity,
    searchByCoords,
    toggleUnit,
    addFavorite,
    removeFavorite,
    isFavorite: checkFavorite,
    clearRecentSearches,
    clearError,
  };

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeather must be used within a WeatherProvider');
  return context;
};
