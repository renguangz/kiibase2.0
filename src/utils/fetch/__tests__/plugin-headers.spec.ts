import { PUBLIC_SELF_API_HOST } from '/config/env';
import { createFetchWithHeaders } from '../plugin-headers';
import { createFetchWithCallback } from '../plugin-callback';

// dependency: msw mock server
//  - GET /health

describe('plugin-headers', () => {
  it.skip('merge Content-Type header', async () => {
    const inputContentType = 'application/json';
    let outputContentType: any;

    let fetchPlus = createFetchWithCallback(fetch, {
      successCallback: (response, url) => {
        outputContentType = (url as Request).headers.get('Content-Type');
      },
    });

    fetchPlus = createFetchWithHeaders(
      fetchPlus,
      new Headers({
        'Content-Type': inputContentType,
      }),
    );

    await fetchPlus(`${PUBLIC_SELF_API_HOST}/health`);

    expect(inputContentType).toBe(outputContentType);
  });
});
