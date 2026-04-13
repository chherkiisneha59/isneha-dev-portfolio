import { motion } from 'framer-motion';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';
import {
  formatTempShort,
  formatDay,
  formatShortDate,
  getWeatherIconUrl,
  capitalize,
  groupForecastByDay,
} from '../utils/helpers';

const DailyForecast = () => {
  const { forecast, weather } = useWeather();
  const { isDark } = useTheme();

  if (!forecast?.list) return null;

  const dailyData = groupForecastByDay(forecast.list);
  const timezone = weather?.timezone || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full"
      id="daily-forecast"
    >
      <div className={`rounded-3xl p-5 md:p-6 ${isDark ? 'glass-card' : 'glass-card-light'}`}>
        <h2 className={`text-base font-display font-bold mb-4 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
          5-Day Forecast
        </h2>

        <div className="space-y-2">
          {dailyData.slice(0, 5).map((day, index) => (
            <motion.div
              key={day.dt}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className={`flex items-center justify-between py-3 px-3 rounded-xl transition-colors
                ${index === 0
                  ? isDark
                    ? 'bg-primary-500/10'
                    : 'bg-primary-50/80'
                  : isDark
                    ? 'hover:bg-white/[0.04]'
                    : 'hover:bg-gray-50'
                }
              `}
            >
              {/* Day */}
              <div className="flex items-center gap-3 w-28 md:w-36">
                <div>
                  <p className={`text-sm font-semibold ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                    {index === 0 ? 'Today' : formatDay(day.dt, timezone)}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                    {formatShortDate(day.dt, timezone)}
                  </p>
                </div>
              </div>

              {/* Weather Icon + Condition */}
              <div className="flex items-center gap-2 flex-1 justify-center">
                {day.weather && (
                  <>
                    <img
                      src={getWeatherIconUrl(day.weather.icon, '2x')}
                      alt={day.weather.description}
                      className="w-9 h-9"
                    />
                    <span className={`text-xs hidden md:block ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                      {capitalize(day.weather.description)}
                    </span>
                  </>
                )}
              </div>

              {/* Temp Range */}
              <div className="flex items-center gap-2 justify-end">
                <span className={`text-sm font-bold ${isDark ? 'text-white/90' : 'text-gray-700'}`}>
                  {formatTempShort(day.tempMax)}
                </span>
                <div className={`w-16 md:w-24 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 via-yellow-400 to-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(20, ((day.tempMax - day.tempMin) / 20) * 100))}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
                <span className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                  {formatTempShort(day.tempMin)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DailyForecast;
