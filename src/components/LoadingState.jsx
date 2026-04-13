import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const LoadingState = () => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full space-y-4"
      id="loading-state"
    >
      {/* Main Card Skeleton */}
      <div className={`rounded-3xl p-6 md:p-8 ${isDark ? 'glass-card' : 'glass-card-light'}`}>
        {/* Location */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`w-5 h-5 rounded-full ${isDark ? 'shimmer' : 'shimmer-light'}`} />
          <div className={`h-6 w-36 rounded-lg ${isDark ? 'shimmer' : 'shimmer-light'}`} />
          <div className={`h-5 w-10 rounded-full ${isDark ? 'shimmer' : 'shimmer-light'}`} />
        </div>

        {/* Temperature + Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className={`h-24 w-40 rounded-2xl ${isDark ? 'shimmer' : 'shimmer-light'}`} />
          <div className="flex flex-col items-center gap-2">
            <div className={`w-24 h-24 rounded-full ${isDark ? 'shimmer' : 'shimmer-light'}`} />
            <div className={`h-4 w-20 rounded-lg ${isDark ? 'shimmer' : 'shimmer-light'}`} />
          </div>
        </div>

        {/* Sub-info */}
        <div className="flex gap-3 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-4 w-20 rounded-lg ${isDark ? 'shimmer' : 'shimmer-light'}`} />
          ))}
        </div>

        {/* Detail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-gray-50/60'}`}
            >
              <div className={`w-8 h-8 rounded-full ${isDark ? 'shimmer' : 'shimmer-light'}`} />
              <div className={`h-3 w-14 rounded-lg ${isDark ? 'shimmer' : 'shimmer-light'}`} />
              <div className={`h-4 w-16 rounded-lg ${isDark ? 'shimmer' : 'shimmer-light'}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Skeleton */}
      <div className={`rounded-3xl p-5 ${isDark ? 'glass-card' : 'glass-card-light'}`}>
        <div className={`h-5 w-32 rounded-lg mb-4 ${isDark ? 'shimmer' : 'shimmer-light'}`} />
        <div className="flex gap-3 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`flex flex-col items-center gap-2 p-3 rounded-2xl min-w-[80px] ${isDark ? 'bg-white/[0.03]' : 'bg-gray-50/60'}`}>
              <div className={`h-3 w-8 rounded ${isDark ? 'shimmer' : 'shimmer-light'}`} />
              <div className={`w-10 h-10 rounded-full ${isDark ? 'shimmer' : 'shimmer-light'}`} />
              <div className={`h-4 w-8 rounded ${isDark ? 'shimmer' : 'shimmer-light'}`} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingState;
