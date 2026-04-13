import { motion } from 'framer-motion';
import { FiAlertCircle, FiRefreshCw, FiX } from 'react-icons/fi';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';

const ErrorState = () => {
  const { error, clearError } = useWeather();
  const { isDark } = useTheme();

  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className={`w-full rounded-2xl p-4 flex items-start gap-3 border
        ${isDark
          ? 'bg-red-500/10 border-red-500/20 text-red-300'
          : 'bg-red-50 border-red-200 text-red-700'
        }
      `}
      id="error-state"
    >
      <FiAlertCircle className="text-xl flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-semibold mb-0.5">Something went wrong</p>
        <p className={`text-xs ${isDark ? 'text-red-300/70' : 'text-red-600'}`}>{error}</p>
      </div>
      <button
        onClick={clearError}
        className={`p-1.5 rounded-lg transition-colors flex-shrink-0
          ${isDark ? 'hover:bg-red-500/20' : 'hover:bg-red-100'}
        `}
        id="dismiss-error"
      >
        <FiX className="text-base" />
      </button>
    </motion.div>
  );
};

export default ErrorState;
