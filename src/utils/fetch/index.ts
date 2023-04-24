export const getClientCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};

export const fetchData = async (url: string) => {
  const token = getClientCookie('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(url, options);
  const json = await res.json();

  return json ?? null;
};

export const fetchDataWithQueries = async (url: string[], query: string) => {
  const token = getClientCookie('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(url.join(''), options);
  const json = await res.json();

  if (res.status !== 200) {
    throw new Error('fail');
  }

  return json;
};

export const fetchPostData = async <B>(url: string, body: B) => {
  const token = getClientCookie('token');
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const res = await fetch(url, options);
  const json = await res.json();
  return json ?? null;
};

type FetchDeleteData = (url: string) => Promise<any>;
export const fetchDeleteData: FetchDeleteData = async (url) => {
  const token = getClientCookie('token');
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const res = await fetch(url, options);
  const json = await res.json();
  return json ?? null;
};
