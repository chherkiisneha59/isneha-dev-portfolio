import { motion } from 'framer-motion';
import { WiHumidity, WiStrongWind, WiBarometer, WiThermometer } from 'react-icons/wi';
import { FiHeart, FiMapPin } from 'react-icons/fi';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';
import {
  formatTempShort,
  formatTemp,
  getWeatherIconUrl,
  capitalize,
  formatDate,
  formatTime,
  getWindDirection,
  msToKmh,
  msToMph,
} from '../utils/helpers';

const CurrentWeather = () => {
  const { weather, unit, addFavorite, removeFavorite, isFavorite } = useWeather();
  const { isDark } = useTheme();

  if (!weather) return null;

  const {
    name,
    sys: { country, sunrise, sunset },
    main: { temp, feels_like, humidity, pressure, temp_min, temp_max },
    weather: weatherArray,
    wind: { speed, deg },
    visibility,
    timezone,
    coord,
  } = weather;

  const condition = weatherArray[0];
  const iconUrl = getWeatherIconUrl(condition.icon);
  const isFav = isFavorite(name);
  const windSpeed = unit === 'metric' ? msToKmh(speed) : msToMph(speed);
  const windUnit = unit === 'metric' ? 'km/h' : 'mph';

  const handleFavoriteToggle = () => {
    if (isFav) {
      removeFavorite(name);
    } else {
      addFavorite(weather);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full"
      id="current-weather"
    >
      {/* Main Weather Card */}
      <div className={`relative overflow-hidden rounded-3xl p-6 md:p-8 ${isDark ? 'glass-card' : 'glass-card-light'}`}>
        {/* Decorative Gradient Orb */}
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary-400/5 blur-2xl pointer-events-none" />

        {/* Top Row: Location + Favorite */}
        <div className="relative flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FiMapPin className={`text-sm ${isDark ? 'text-primary-400' : 'text-primary-500'}`} />
              <h1 className={`text-xl md:text-2xl font-display font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {name}
              </h1>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                ${isDark ? 'bg-white/10 text-white/60' : 'bg-gray-100 text-gray-500'}
              `}>
                {country}
              </span>
            </div>
            <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
              {formatDate(Math.floor(Date.now() / 1000), timezone)}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleFavoriteToggle}
            className={`p-2.5 rounded-xl transition-all duration-300
              ${isFav
                ? 'bg-red-500/20 text-red-400'
                : isDark
                  ? 'bg-white/[0.06] text-white/40 hover:text-red-400 hover:bg-red-500/10'
                  : 'bg-gray-100 text-gray-400 hover:text-red-400 hover:bg-red-50'
              }
            `}
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
            id="favorite-button"
          >
            <FiHeart className={`text-lg ${isFav ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        {/* Main Temperature Display */}
        <div className="relative flex items-center justify-between mb-6">
          <div className="flex items-start">
            <motion.span
              key={temp}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-7xl md:text-8xl lg:text-9xl font-display font-black leading-none tracking-tighter
                ${isDark ? 'text-white text-shadow-md' : 'text-gray-800'}
              `}
            >
              {formatTempShort(temp)}
            </motion.span>
          </div>
          <div className="flex flex-col items-center">
            <motion.img
              src={iconUrl}
              alt={condition.description}
              className="w-24 h-24 md:w-28 md:h-28 drop-shadow-lg"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <p className={`text-sm md:text-base font-semibold text-center -mt-1
              ${isDark ? 'text-white/80' : 'text-gray-600'}
            `}>
              {capitalize(condition.description)}
            </p>
          </div>
        </div>

        {/* Sub-info Row */}
        <div className={`flex items-center gap-4 text-sm mb-6
          ${isDark ? 'text-white/50' : 'text-gray-500'}
        `}>
          <span>H: {formatTemp(temp_max, unit)}</span>
          <span>L: {formatTemp(temp_min, unit)}</span>
          <span className="flex items-center gap-1">
            <WiThermometer className="text-base" />
            Feels {formatTemp(feels_like, unit)}
          </span>
        </div>

        {/* Detail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <DetailCard
            icon={<WiHumidity className="text-2xl text-blue-400" />}
            label="Humidity"
            value={`${humidity}%`}
            isDark={isDark}
          />
          <DetailCard
            icon={<WiStrongWind className="text-2xl text-teal-400" />}
            label="Wind"
            value={`${windSpeed} ${windUnit}`}
            sub={getWindDirection(deg)}
            isDark={isDark}
          />
          <DetailCard
            icon={<WiBarometer className="text-2xl text-purple-400" />}
            label="Pressure"
            value={`${pressure} hPa`}
            isDark={isDark}
          />
          <DetailCard
            icon={<WiThermometer className="text-2xl text-orange-400" />}
            label="Visibility"
            value={`${(visibility / 1000).toFixed(1)} km`}
            isDark={isDark}
          />
        </div>

        {/* Sunrise / Sunset */}
        <div className={`mt-4 pt-4 border-t flex items-center justify-between text-sm
          ${isDark ? 'border-white/[0.06] text-white/40' : 'border-gray-200/60 text-gray-400'}
        `}>
          <span>🌅 Sunrise: {formatTime(sunrise, timezone)}</span>
          <span>🌇 Sunset: {formatTime(sunset, timezone)}</span>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Small detail card within the current weather section
 */
const DetailCard = ({ icon, label, value, sub, isDark }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-colors
      ${isDark
        ? 'bg-white/[0.04] hover:bg-white/[0.08]'
        : 'bg-gray-50/80 hover:bg-gray-100/80'
      }
    `}
  >
    {icon}
    <span className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>{label}</span>
    <span className={`text-sm font-bold ${isDark ? 'text-white/90' : 'text-gray-700'}`}>{value}</span>
    {sub && <span className={`text-xs ${isDark ? 'text-white/30' : 'text-gray-400'}`}>{sub}</span>}
  </motion.div>
);

export default CurrentWeather;
