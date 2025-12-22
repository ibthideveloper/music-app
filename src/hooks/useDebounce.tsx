import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Start a timer that updates debouncedValue after delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: runs before next effect call
    // It cancels the previous timer if value changes quickly
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // Re-run effect whenever value or delay changes

  return debouncedValue;
}

export default useDebounce;
