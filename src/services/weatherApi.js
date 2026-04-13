import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

/**
 * Get current weather data by city name
 */
export const getCurrentWeather = async (city, units = 'metric') => {
  try {
    const response = await weatherApi.get('/weather', {
      params: {
        q: city,
        appid: API_KEY,
        units,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
};

/**
 * Get current weather by coordinates
 */
export const getWeatherByCoords = async (lat, lon, units = 'metric') => {
  try {
    const response = await weatherApi.get('/weather', {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
};

/**
 * Get 5-day / 3-hour forecast by city name
 */
export const getForecast = async (city, units = 'metric') => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: {
        q: city,
        appid: API_KEY,
        units,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
};

/**
 * Get 5-day / 3-hour forecast by coordinates
 */
export const getForecastByCoords = async (lat, lon, units = 'metric') => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
};

/**
 * Get city suggestions from geocoding API
 */
export const getCitySuggestions = async (query) => {
  try {
    const response = await axios.get(`${GEO_URL}/direct`, {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY,
      },
      timeout: 5000,
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: [], error: getErrorMessage(error) };
  }
};

/**
 * Reverse geocoding — get city name from coordinates
 */
export const reverseGeocode = async (lat, lon) => {
  try {
    const response = await axios.get(`${GEO_URL}/reverse`, {
      params: {
        lat,
        lon,
        limit: 1,
        appid: API_KEY,
      },
      timeout: 5000,
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
};

/**
 * Extract a user-friendly error message from API errors
 */
function getErrorMessage(error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        return 'Invalid API key. Please check your configuration.';
      case 404:
        return 'City not found. Please check the name and try again.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
        return 'Weather service is temporarily unavailable. Please try again later.';
      default:
        return `Something went wrong (Error ${error.response.status}).`;
    }
  } else if (error.request) {
    return 'Network error. Please check your internet connection.';
  }
  return 'An unexpected error occurred. Please try again.';
}
