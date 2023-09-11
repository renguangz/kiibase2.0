import { PUBLIC_API_TIMEOUT } from '/config/env';
import { endpointNaviItemGET } from './base/endpoint';
import createFetchWithPlugins from '/src/utils/fetch';
import Cookies from 'js-cookie';

export default function getNaviItem(callback?: FetchPluginOptions['callback']) {
  const fetchPlus = createFetchWithPlugins({
    timeout: PUBLIC_API_TIMEOUT,
    callback,
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`,
    }),
  });

  const request = new Request(endpointNaviItemGET());

  return fetchPlus(request);
}
