/**
 * Format temperature value with degree symbol
 */
export const formatTemp = (temp, unit = 'metric') => {
  if (temp === undefined || temp === null) return '--';
  const rounded = Math.round(temp);
  return `${rounded}°${unit === 'metric' ? 'C' : 'F'}`;
};

/**
 * Format temperature without unit for large display
 */
export const formatTempShort = (temp) => {
  if (temp === undefined || temp === null) return '--';
  return `${Math.round(temp)}°`;
};

/**
 * Get weather icon URL from OpenWeatherMap
 */
export const getWeatherIconUrl = (iconCode, size = '4x') => {
  if (!iconCode) return '';
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};

/**
 * Format UNIX timestamp to readable time
 */
export const formatTime = (timestamp, timezone = 0) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });
};

/**
 * Format UNIX timestamp to day name
 */
export const formatDay = (timestamp, timezone = 0) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    timeZone: 'UTC',
  });
};

/**
 * Format UNIX timestamp to full date
 */
export const formatDate = (timestamp, timezone = 0) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
};

/**
 * Format UNIX timestamp to short date
 */
export const formatShortDate = (timestamp, timezone = 0) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
};

/**
 * Get hour in 12h format from UNIX timestamp
 */
export const formatHour = (timestamp, timezone = 0) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
    timeZone: 'UTC',
  });
};

/**
 * Capitalize the first letter of each word
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Get the wind direction from degrees
 */
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

/**
 * Get the weather background class based on weather condition
 */
export const getWeatherBackground = (weatherMain, isLight = false) => {
  const suffix = isLight ? '-light' : '';
  switch (weatherMain?.toLowerCase()) {
    case 'clear':
      return `bg-weather-clear${suffix}`;
    case 'clouds':
      return `bg-weather-clouds${suffix}`;
    case 'rain':
    case 'drizzle':
      return `bg-weather-rain${suffix}`;
    case 'thunderstorm':
      return `bg-weather-thunderstorm${suffix}`;
    case 'snow':
      return `bg-weather-snow${suffix}`;
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog':
    case 'sand':
    case 'ash':
    case 'squall':
    case 'tornado':
      return `bg-weather-mist${suffix}`;
    default:
      return `bg-weather-default${suffix}`;
  }
};

/**
 * Group forecast entries by day
 */
export const groupForecastByDay = (forecastList) => {
  if (!forecastList) return [];

  const groups = {};
  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    if (!groups[date]) {
      groups[date] = {
        date,
        dt: item.dt,
        items: [],
        tempMin: Infinity,
        tempMax: -Infinity,
      };
    }
    groups[date].items.push(item);
    groups[date].tempMin = Math.min(groups[date].tempMin, item.main.temp_min);
    groups[date].tempMax = Math.max(groups[date].tempMax, item.main.temp_max);
    // Pick the most common weather icon for the day
    if (!groups[date].weather || item.dt_txt?.includes('12:00')) {
      groups[date].weather = item.weather[0];
    }
  });

  return Object.values(groups);
};

/**
 * Get visibility description
 */
export const getVisibilityText = (meters) => {
  if (meters >= 10000) return 'Excellent';
  if (meters >= 5000) return 'Good';
  if (meters >= 2000) return 'Moderate';
  if (meters >= 1000) return 'Poor';
  return 'Very Poor';
};

/**
 * Convert meters/sec to km/h
 */
export const msToKmh = (ms) => Math.round(ms * 3.6);

/**
 * Convert meters/sec to mph
 */
export const msToMph = (ms) => Math.round(ms * 2.237);
