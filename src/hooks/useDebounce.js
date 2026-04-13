import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook for debounced input
 * @param {string} initialValue - Initial input value
 * @param {number} delay - Debounce delay in milliseconds
 * @returns {{ value, debouncedValue, setValue, reset }}
 */
export const useDebounce = (initialValue = '', delay = 400) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  const reset = useCallback(() => {
    setValue('');
    setDebouncedValue('');
  }, []);

  return { value, debouncedValue, setValue, reset };
};
