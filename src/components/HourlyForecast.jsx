import { motion } from 'framer-motion';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';
import { formatTempShort, formatHour, getWeatherIconUrl } from '../utils/helpers';

const HourlyForecast = () => {
  const { forecast, weather } = useWeather();
  const { isDark } = useTheme();

  if (!forecast?.list) return null;

  // Get the next 24 hours (8 x 3-hour intervals)
  const hourlyData = forecast.list.slice(0, 8);
  const timezone = weather?.timezone || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
      id="hourly-forecast"
    >
      <div className={`rounded-3xl p-5 md:p-6 ${isDark ? 'glass-card' : 'glass-card-light'}`}>
        <h2 className={`text-base font-display font-bold mb-4 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
          Hourly Forecast
        </h2>

        <div className="forecast-scroll">
          {hourlyData.map((item, index) => (
            <motion.div
              key={item.dt}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex flex-col items-center gap-2 px-4 py-3 rounded-2xl min-w-[80px] transition-colors
                ${index === 0
                  ? isDark
                    ? 'bg-primary-500/20 border border-primary-500/30'
                    : 'bg-primary-50 border border-primary-200'
                  : isDark
                    ? 'bg-white/[0.03] hover:bg-white/[0.06]'
                    : 'bg-gray-50/60 hover:bg-gray-100/80'
                }
              `}
            >
              <span className={`text-xs font-medium ${
                index === 0
                  ? isDark ? 'text-primary-300' : 'text-primary-600'
                  : isDark ? 'text-white/40' : 'text-gray-400'
              }`}>
                {index === 0 ? 'Now' : formatHour(item.dt, timezone)}
              </span>
              <img
                src={getWeatherIconUrl(item.weather[0].icon, '2x')}
                alt={item.weather[0].description}
                className="w-10 h-10"
              />
              <span className={`text-sm font-bold ${isDark ? 'text-white/90' : 'text-gray-700'}`}>
                {formatTempShort(item.main.temp)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HourlyForecast;
