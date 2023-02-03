export const fetchData = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();

  return json ?? null;
};
