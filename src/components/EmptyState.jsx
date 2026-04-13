import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiCloud } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const EmptyState = () => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center text-center py-16 px-4"
      id="empty-state"
    >
      {/* Animated Cloud Illustration */}
      <motion.div
        className="relative mb-8"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className={`w-32 h-32 rounded-full flex items-center justify-center
          ${isDark
            ? 'bg-gradient-to-br from-primary-500/20 to-primary-700/10'
            : 'bg-gradient-to-br from-primary-100 to-primary-200/50'
          }
        `}>
          <FiCloud className={`text-6xl ${isDark ? 'text-primary-400/60' : 'text-primary-400'}`} />
        </div>
        {/* Floating orbs */}
        <motion.div
          className={`absolute -top-2 -right-2 w-6 h-6 rounded-full
            ${isDark ? 'bg-yellow-400/20' : 'bg-yellow-300/40'}
          `}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className={`absolute -bottom-1 -left-3 w-4 h-4 rounded-full
            ${isDark ? 'bg-blue-400/20' : 'bg-blue-300/40'}
          `}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      <h2 className={`text-2xl font-display font-bold mb-3
        ${isDark ? 'text-white/80' : 'text-gray-700'}
      `}>
        Welcome to SkyCast
      </h2>
      <p className={`text-sm max-w-xs mb-8 leading-relaxed
        ${isDark ? 'text-white/40' : 'text-gray-400'}
      `}>
        Search for a city or use your current location to get real-time weather updates and forecasts.
      </p>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm
          ${isDark
            ? 'bg-white/[0.04] text-white/40 border border-white/[0.06]'
            : 'bg-gray-50 text-gray-400 border border-gray-200/40'
          }
        `}>
          <FiSearch className="text-base" />
          <span>Search a city above</span>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm
          ${isDark
            ? 'bg-white/[0.04] text-white/40 border border-white/[0.06]'
            : 'bg-gray-50 text-gray-400 border border-gray-200/40'
          }
        `}>
          <FiMapPin className="text-base" />
          <span>Or use your location</span>
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyState;
