export const fetchData = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();

  return json ?? null;
};

export const fetchDataWithQueries = async (url: string, query: string) => {
  const res = await fetch(`${url}${query ?? ''}`);
  const json = await res.json();

  if (res.status !== 200) {
    throw new Error('fail');
  }

  return json;
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
