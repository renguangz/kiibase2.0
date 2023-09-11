import { createFetchWithTimeout } from './plugin-timeout';
import { createFetchWithCallback } from './plugin-callback';
import { createFetchWithHeaders } from './plugin-headers';

export default function createFetchWithPlugins(
  options: FetchPluginOptions
): Fetch {
  let result = fetch;
  const { timeout, callback, headers } = options ?? {};

  if (typeof timeout !== 'undefined') {
    result = createFetchWithTimeout(result, timeout);
  }
  if (typeof callback !== 'undefined') {
    result = createFetchWithCallback(result, callback);
  }
  if (typeof headers !== 'undefined') {
    result = createFetchWithHeaders(result, headers);
  }
  return result;
}
