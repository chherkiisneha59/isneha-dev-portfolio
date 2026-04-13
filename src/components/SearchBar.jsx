import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WiDaySunny } from 'react-icons/wi';
import { FiSearch, FiMapPin, FiX, FiClock, FiTrash2 } from 'react-icons/fi';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';
import { useDebounce } from '../hooks/useDebounce';
import { useGeolocation } from '../hooks/useGeolocation';
import { getCitySuggestions } from '../services/weatherApi';

const SearchBar = () => {
  const { searchByCity, searchByCoords, recentSearches, clearRecentSearches } = useWeather();
  const { isDark } = useTheme();
  const { loading: geoLoading, getLocation } = useGeolocation();
  const { value, debouncedValue, setValue, reset } = useDebounce('', 350);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Fetch city suggestions when debounced value changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedValue.length < 2) {
        setSuggestions([]);
        return;
      }
      setSuggestionsLoading(true);
      const result = await getCitySuggestions(debouncedValue);
      if (result.data && result.data.length > 0) {
        setSuggestions(result.data);
      } else {
        setSuggestions([]);
      }
      setSuggestionsLoading(false);
    };
    fetchSuggestions();
  }, [debouncedValue]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (value.trim()) {
      searchByCity(value.trim());
      setShowDropdown(false);
      reset();
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const cityName = suggestion.state
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;
    searchByCity(suggestion.name);
    setShowDropdown(false);
    reset();
  };

  const handleRecentClick = (city) => {
    searchByCity(city);
    setShowDropdown(false);
    reset();
  };

  const handleLocationClick = async () => {
    try {
      const coords = await getLocation();
      searchByCoords(coords.lat, coords.lon);
      setShowDropdown(false);
    } catch {
      // Error handled by hook
    }
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleClear = () => {
    reset();
    setSuggestions([]);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-lg mx-auto" id="search-bar">
      <form onSubmit={handleSearch} className="relative flex items-center gap-2">
        {/* Search Input */}
        <div className={`relative flex-1 ${isDark ? 'glass-input' : 'glass-input-light'}`}>
          <FiSearch className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/50' : 'text-gray-400'} text-lg`} />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={handleFocus}
            placeholder="Search for a city..."
            className={`w-full pl-11 pr-10 py-3.5 bg-transparent outline-none text-sm font-medium
              ${isDark ? 'text-white placeholder-white/40' : 'text-gray-800 placeholder-gray-400'}
            `}
            id="search-input"
            autoComplete="off"
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors
                ${isDark ? 'text-white/50 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}
              `}
              id="search-clear"
            >
              <FiX className="text-base" />
            </button>
          )}
        </div>

        {/* Location Button */}
        <motion.button
          type="button"
          onClick={handleLocationClick}
          disabled={geoLoading}
          whileTap={{ scale: 0.92 }}
          className={`flex-shrink-0 p-3.5 rounded-xl border transition-all duration-300
            ${isDark
              ? 'border-white/10 bg-white/[0.06] backdrop-blur-xl text-white/70 hover:text-white hover:bg-white/15'
              : 'border-gray-200/60 bg-white/80 backdrop-blur-xl text-gray-500 hover:text-primary-600 hover:bg-white'
            } ${geoLoading ? 'animate-pulse' : ''}
          `}
          title="Use my location"
          id="location-button"
        >
          <FiMapPin className="text-lg" />
        </motion.button>
      </form>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full left-0 right-0 mt-2 rounded-2xl border overflow-hidden z-50 shadow-glass-lg
              ${isDark
                ? 'border-white/10 bg-slate-900/95 backdrop-blur-2xl'
                : 'border-gray-200/60 bg-white/95 backdrop-blur-2xl'
              }
            `}
            id="search-dropdown"
          >
            {/* Suggestions */}
            {suggestionsLoading && (
              <div className={`px-4 py-3 text-sm ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                Searching...
              </div>
            )}

            {suggestions.length > 0 && (
              <div className="py-1">
                <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                  Suggestions
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.name}-${suggestion.lat}-${index}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors
                      ${isDark
                        ? 'hover:bg-white/[0.06] text-white/80'
                        : 'hover:bg-gray-50 text-gray-700'
                      }
                    `}
                  >
                    <WiDaySunny className={`text-lg flex-shrink-0 ${isDark ? 'text-primary-400' : 'text-primary-500'}`} />
                    <div>
                      <span className="text-sm font-medium">{suggestion.name}</span>
                      <span className={`text-xs ml-1.5 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                        {suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {suggestions.length === 0 && !suggestionsLoading && recentSearches.length > 0 && (
              <div className="py-1">
                <div className={`px-4 py-2 flex items-center justify-between`}>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                    Recent Searches
                  </span>
                  <button
                    onClick={clearRecentSearches}
                    className={`text-xs flex items-center gap-1 transition-colors
                      ${isDark ? 'text-white/30 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}
                    `}
                    id="clear-recent"
                  >
                    <FiTrash2 className="text-xs" />
                    Clear
                  </button>
                </div>
                {recentSearches.map((city, index) => (
                  <button
                    key={`recent-${city}-${index}`}
                    onClick={() => handleRecentClick(city)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors
                      ${isDark
                        ? 'hover:bg-white/[0.06] text-white/70'
                        : 'hover:bg-gray-50 text-gray-600'
                      }
                    `}
                  >
                    <FiClock className={`text-sm flex-shrink-0 ${isDark ? 'text-white/30' : 'text-gray-300'}`} />
                    <span className="text-sm">{city}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Use Location */}
            <div className={`border-t ${isDark ? 'border-white/[0.06]' : 'border-gray-100'}`}>
              <button
                onClick={handleLocationClick}
                disabled={geoLoading}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                  ${isDark
                    ? 'hover:bg-white/[0.06] text-primary-400'
                    : 'hover:bg-gray-50 text-primary-600'
                  }
                `}
                id="dropdown-location"
              >
                <FiMapPin className="text-sm flex-shrink-0" />
                <span className="text-sm font-medium">
                  {geoLoading ? 'Getting your location...' : 'Use current location'}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
