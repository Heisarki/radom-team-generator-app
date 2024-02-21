/* Local storage hook that execute everytime state changes or at inital load of component */
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const isClient = typeof window !== 'undefined'; // Check if running on the client side

  const [value, setValue] = useState<T>(() => {
    if (isClient) {
      const jsonValue = window.localStorage.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue);
    }

    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (isClient) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [isClient, key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}