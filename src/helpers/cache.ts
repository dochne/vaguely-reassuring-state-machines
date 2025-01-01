export async function cache<T>(
  key: string,
  callable: () => Promise<T>,
  maxAge = 86400,
) {
  const value = window.localStorage.getItem(key);
  if (value !== null) {
    const { updatedAt, data } = JSON.parse(value);
    if (Date.now() - maxAge * 1000 < updatedAt) {
      return data;
    }
  }

  const data = await callable();
  window.localStorage.setItem(
    key,
    JSON.stringify({
      data: data,
      updatedAt: Date.now(),
    }),
  );
  return data;
}
