export function createFetchWithCallback(fetch: Fetch, callback?: FetchCallback): Fetch {
  return function (url, options) {
    const { successCallback, errorCallback, successAsync, errorAsync, exceptionCallback } = callback ?? {};

    return fetch(cloneRequest(url), options)
      .then((response) => {
        if (response.ok) {
          successCallback && successCallback(cloneResponse(response), cloneRequest(url));
        } else {
          errorCallback && errorCallback(cloneResponse(response), cloneRequest(url));
        }
        return response;
      })
      .then(async (response) => {
        if (response.ok) {
          successAsync && (await successAsync(cloneResponse(response), cloneRequest(url)));
        } else {
          errorAsync && (await errorAsync(cloneResponse(response), cloneRequest(url)));
        }
        return response;
      })
      .catch((error) => {
        exceptionCallback && exceptionCallback(error);
        return error;
      });
  };
}

function cloneRequest(req: RequestInfo | URL) {
  return req instanceof Request ? req.clone() : req;
}

function cloneResponse(res: Response) {
  return res.clone();
}
