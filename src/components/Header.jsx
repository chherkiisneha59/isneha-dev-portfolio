import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiThermometer } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useWeather } from '../context/WeatherContext';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { unit, toggleUnit } = useWeather();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex items-center justify-between py-4 px-1"
      id="app-header"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center
          ${isDark
            ? 'bg-gradient-to-br from-primary-500 to-primary-700 shadow-glow'
            : 'bg-gradient-to-br from-primary-400 to-primary-600 shadow-md'
          }
        `}>
          <span className="text-white text-lg font-bold">☁</span>
        </div>
        <div>
          <h1 className={`text-lg font-display font-extrabold leading-tight
            ${isDark ? 'text-white' : 'text-gray-800'}
          `}>
            SkyCast
          </h1>
          <p className={`text-[10px] font-medium tracking-wider uppercase
            ${isDark ? 'text-white/30' : 'text-gray-400'}
          `}>
            Weather
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Unit Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleUnit}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300
            ${isDark
              ? 'bg-white/[0.06] border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              : 'bg-white/80 border border-gray-200/60 text-gray-500 hover:text-gray-700 hover:bg-white'
            }
          `}
          title="Toggle temperature unit"
          id="unit-toggle"
        >
          <FiThermometer className="text-sm" />
          {unit === 'metric' ? '°C' : '°F'}
        </motion.button>

        {/* Theme Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className={`p-2.5 rounded-xl transition-all duration-300
            ${isDark
              ? 'bg-white/[0.06] border border-white/10 text-yellow-300 hover:bg-white/10'
              : 'bg-white/80 border border-gray-200/60 text-slate-700 hover:bg-white'
            }
          `}
          title="Toggle dark/light mode"
          id="theme-toggle"
        >
          <motion.div
            key={isDark ? 'moon' : 'sun'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
          </motion.div>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
