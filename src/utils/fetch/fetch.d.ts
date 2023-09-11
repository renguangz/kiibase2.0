type Fetch = typeof fetch;

type FetchCallback = {
  successCallback?: (response: Response, request: RequestInfo | URL) => void;
  errorCallback?: (response: Response, request: RequestInfo | URL) => void;
  successAsync?: (
    response: Response,
    request: RequestInfo | URL
  ) => Promise<any>;
  errorAsync?: (response: Response, request: RequestInfo | URL) => Promise<any>;
  exceptionCallback?: (error: Error) => void;
};

type FetchPluginOptions = {
  callback?: FetchCallback;
  headers?: Headers;
  timeout?: number;
};
