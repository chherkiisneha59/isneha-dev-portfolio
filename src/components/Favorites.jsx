import { motion } from 'framer-motion';
import { FiMapPin, FiX } from 'react-icons/fi';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';

const Favorites = () => {
  const { favorites, searchByCity, removeFavorite } = useWeather();
  const { isDark } = useTheme();

  if (favorites.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full"
      id="favorites-section"
    >
      <div className={`rounded-3xl p-5 md:p-6 ${isDark ? 'glass-card' : 'glass-card-light'}`}>
        <h2 className={`text-base font-display font-bold mb-4 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
          ⭐ Favorite Cities
        </h2>

        <div className="forecast-scroll">
          {favorites.map((city, index) => (
            <motion.div
              key={`fav-${city.name}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`relative group flex flex-col items-center gap-2 px-5 py-4 rounded-2xl min-w-[110px] cursor-pointer transition-all duration-300
                ${isDark
                  ? 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06]'
                  : 'bg-gray-50/60 hover:bg-gray-100 border border-gray-200/40'
                }
              `}
              onClick={() => searchByCity(city.name)}
            >
              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(city.name);
                }}
                className={`absolute top-1.5 right-1.5 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all
                  ${isDark
                    ? 'bg-white/10 text-white/40 hover:bg-red-500/20 hover:text-red-400'
                    : 'bg-gray-200 text-gray-400 hover:bg-red-100 hover:text-red-500'
                  }
                `}
              >
                <FiX className="text-xs" />
              </button>

              <FiMapPin className={`text-base ${isDark ? 'text-primary-400' : 'text-primary-500'}`} />
              <span className={`text-sm font-semibold text-center ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                {city.name}
              </span>
              {city.country && (
                <span className={`text-xs ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                  {city.country}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Favorites;
