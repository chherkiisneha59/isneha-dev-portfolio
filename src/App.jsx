import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import Favorites from './components/Favorites';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import EmptyState from './components/EmptyState';
import WeatherParticles from './components/WeatherParticles';
import Footer from './components/Footer';
import { useWeather } from './context/WeatherContext';
import { useTheme } from './context/ThemeContext';
import { getWeatherBackground } from './utils/helpers';

const App = () => {
  const { weather, loading, error } = useWeather();
  const { isDark } = useTheme();

  const bgClass = useMemo(() => {
    if (!weather) return isDark ? 'bg-weather-default' : 'bg-weather-default-light';
    const main = weather.weather?.[0]?.main;
    return getWeatherBackground(main, !isDark);
  }, [weather, isDark]);

  return (
    <div
      className={`relative min-h-screen transition-all duration-1000 ease-in-out ${bgClass}`}
      id="app-root"
    >
      {/* Background Particles */}
      <WeatherParticles />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 pb-8">
        <Header />

        <div className="mt-4 mb-6">
          <SearchBar />
        </div>

        <AnimatePresence mode="wait">
          {error && <ErrorState key="error" />}
        </AnimatePresence>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingState key="loading" />
            ) : weather ? (
              <div key="weather" className="space-y-4">
                <CurrentWeather />
                <HourlyForecast />
                <DailyForecast />
                <Favorites />
              </div>
            ) : (
              <EmptyState key="empty" />
            )}
          </AnimatePresence>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;
