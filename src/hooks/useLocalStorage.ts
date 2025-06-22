import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, (arg0: T) => void] {
  // console.log("UseLocalStorage happening");
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }
    console.log("Callign setStateeee");
    setState(item ? JSON.parse(item) : defaultValue);
  }, []);

  return [
    state,
    (value: T) => {
      console.log("Calling set with ", value);
      setState(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
  ];
}
