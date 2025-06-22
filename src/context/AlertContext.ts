import { createContext } from "react";

export const AlertContext = createContext<{
  message: string | null;
  setAlert: (message: string, duration?: number) => void;
}>({ message: null, setAlert: () => {} });
