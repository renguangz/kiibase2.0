export function createFetchWithTimeout(fetch: Fetch, timeout: number): Fetch {
  return function (url, options) {
    return new Promise((resolve, reject) => {
      const signalController = new AbortController();
      fetch(url, { ...options, signal: signalController.signal }).then(
        resolve,
        reject
      );
      setTimeout(() => {
        reject(new Error(`FETCH_TIMEOUT_ERROR :>> ${timeout} ms`));
        signalController.abort();
      }, timeout);
    });
  };
}
