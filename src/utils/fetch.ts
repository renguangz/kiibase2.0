export const fetchData = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();

  return json ?? null;
};

export const fetchPostData = async <B>(url: string, body: B) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
  };
  const res = await fetch(url, options);
  const json = await res.json();
  return json ?? null;
};
