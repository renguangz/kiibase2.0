import { PUBLIC_SELF_API_HOST } from '/config/env';
import createFetchWithPlugins from '../index';

describe('fetch factory', () => {
  it.skip('should timeout and invoke exception callback', async () => {
    let errorMessage = '';

    const fetchPlus = createFetchWithPlugins({
      timeout: 500,
      callback: {
        exceptionCallback: (error) => {
          errorMessage = error.message;
        },
      },
    });

    await fetchPlus(`${PUBLIC_SELF_API_HOST}/health-timeout`);

    expect(errorMessage.startsWith('FETCH_TIMEOUT_ERROR')).toBe(true);
  });
});
