export function createFetchWithHeaders(fetch: Fetch, headers: Headers): Fetch {
  return function (url, options) {
    return fetch(mergeUrlWithHeaders(url, headers), options);
  };
}

function mergeHeaders(base: Headers, source: Headers) {
  const collect: any = {};
  // Type 'IterableIterator<string>' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.
  for (const key of base.keys()) {
    collect[key] = base.get(key);
  }
  for (const key of source.keys()) {
    collect[key] = source.get(key);
  }
  return new Headers(collect);
}

function mergeRequesetWithHeaders(url: Request, headers: Headers) {
  return new Request(url.url, {
    method: url.method,
    headers: mergeHeaders(headers, url.headers),
    body: url.body,
    mode: url.mode,
    credentials: url.credentials,
    cache: url.cache,
    redirect: url.redirect,
    referrer: url.referrer,
    referrerPolicy: url.referrerPolicy,
    integrity: url.integrity,
    keepalive: url.keepalive,
    signal: url.signal,
  });
}

function transferURLToRequest(url: URL): Request {
  return new Request(url.href);
}

function transferStringToRequest(url: string): Request {
  return new Request(url);
}

function mergeUrlWithHeaders(url: RequestInfo | URL, headers: Headers) {
  if (url instanceof URL) {
    return mergeRequesetWithHeaders(transferURLToRequest(url), headers);
  } else if (typeof url === 'string') {
    return mergeRequesetWithHeaders(transferStringToRequest(url), headers);
  } else if (url instanceof Request) {
    return mergeRequesetWithHeaders(url, headers);
  } else {
    console.error('mergeUrlWithHeaders error :>> handle this or app broken');
    return new Request(url);
  }
}
