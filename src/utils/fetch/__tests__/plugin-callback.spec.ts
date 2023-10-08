import { PUBLIC_SELF_API_HOST } from '/config/env';
import { createFetchWithCallback } from '../plugin-callback';

// dependency: msw mock server handler
//  - GET /api/health
//  - GET /api/not-health

describe('plugin-callback', () => {
  // await fetch 不會等待 successCallback 執行完畢
  it.skip('fetch will not wait successCallback to done', async () => {
    let data: any;
    const fetchPlus = createFetchWithCallback(fetch, {
      // successCallback can be async/await function or regualr function
      successCallback: async (response, url) => {
        data = await response.json();
        // console.log('inner data :>> ', data);
      },
    });
    // here await not wait successCallback to done
    await fetchPlus(`${PUBLIC_SELF_API_HOST}/health`);
    expect(data?.message).not.toBe('good health');
  });

  // await fetch 不會等待 errorCallback 執行完畢
  it.skip('fetch will not wait errorCallback to done', async () => {
    let data: any;
    const fetchPlus = createFetchWithCallback(fetch, {
      // errorCallback can be async/await function or regular function
      errorCallback: async (response, url) => {
        data = await response.json();
        // console.log('inner data :>> ', data);
      },
    });
    // here await not wait errorCallback to done
    await fetchPlus(`${PUBLIC_SELF_API_HOST}/not-health`);
    expect(data?.message).not.toBe('not health');
  });

  // await fetch 會等待 successAsync 執行完畢
  it.skip('fetch will wait successAsync to done.', async () => {
    let data: any;
    const fetchPlus = createFetchWithCallback(fetch, {
      // successAsync must be async/await function or function that return Promise
      successAsync: async (response, url) => {
        data = await response.json();
      },
    });

    // here await will wait successAsync to done
    await fetchPlus(`${PUBLIC_SELF_API_HOST}/health`);
    expect(data?.message).toBe('good health');
  });

  // await fetch 會等待 errorAsync 執行完畢
  it.skip('fetch will wait errorAsync to done.', async () => {
    let data: any;
    const fetchPlus = createFetchWithCallback(fetch, {
      // errorAsync muse be async/await function or function that return Promise
      errorAsync: async (response, url) => {
        data = await response.json();
      },
    });

    // here await will wait errorAsync to done
    await fetchPlus(`${PUBLIC_SELF_API_HOST}/not-health`);
    expect(data?.message).toBe('not health');
  });
});
