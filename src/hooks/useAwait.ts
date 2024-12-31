import { useState, useEffect } from "react";

interface Response<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export const useAwait = <T>(callable: () => Promise<T>): Response<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await callable();
        setData(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, error, loading };
};
