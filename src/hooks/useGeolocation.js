import { useState, useCallback } from 'react';

/**
 * Custom hook for browser geolocation
 * @returns {{ coords, loading, error, getLocation }}
 */
export const useGeolocation = () => {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return Promise.reject(new Error('Geolocation not supported'));
    }

    setLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lon: longitude });
          setLoading(false);
          resolve({ lat: latitude, lon: longitude });
        },
        (err) => {
          let message;
          switch (err.code) {
            case err.PERMISSION_DENIED:
              message = 'Location permission denied. Please enable it in your browser settings.';
              break;
            case err.POSITION_UNAVAILABLE:
              message = 'Location information is unavailable.';
              break;
            case err.TIMEOUT:
              message = 'Location request timed out. Please try again.';
              break;
            default:
              message = 'An unknown error occurred while getting your location.';
          }
          setError(message);
          setLoading(false);
          reject(new Error(message));
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000, // 5 min cache
        }
      );
    });
  }, []);

  return { coords, loading, error, getLocation };
};
