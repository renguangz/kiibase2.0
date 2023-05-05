import { request, requestOptionsTemplate, stringifyParams } from '.';

describe('Request', () => {
  it('should route to `login page` if get status 401', async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch;
    // mockFetch.mockRejectedValue(Promise.reject({ status: 401, message: 'unauthorized' }));

    // const result = await request('test/unauthorized', {});
  });

  it('should have `GET` method with endpoint `test/no/queries`', async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch;
    mockFetch.mockReturnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ status: 200, message: 'success' }),
      }),
    );
    const result = await request('test/no/queries', {});
    expect(result).toStrictEqual({ status: 200, message: 'success' });
  });

  it('should have `GET` method with queries', async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch;
    mockFetch.mockImplementation((url: string) =>
      Promise.resolve({
        ok: true,
        json: () =>
          url.includes('?age=25&name=John')
            ? Promise.resolve({ status: 200, message: 'success with queries' })
            : url.includes('?hobbies=reading,writing&name=John')
            ? Promise.resolve({ status: 200, message: 'success with array queries' })
            : Promise.resolve({ status: 200, message: 'success without queries' }),
      }),
    );

    const queryParam1 = {
      name: 'John',
      age: 25,
    };
    const queryParam2 = { name: 'John', hobbies: ['reading', 'writing'] };
    const queryParam3 = { name: 'John', hobbies: ['reading', 'writing'], age: null, job: undefined };

    const result1 = await request('test', { params: queryParam1 });
    const result2 = await request('test', { params: queryParam2 });
    const result3 = await request('test', { params: queryParam3 });
    const result4 = await request('test', {});

    expect(result1).toStrictEqual({ status: 200, message: 'success with queries' });
    expect(result2).toStrictEqual({ status: 200, message: 'success with array queries' });
    expect(result3).toStrictEqual({ status: 200, message: 'success with array queries' });
    expect(result4).toStrictEqual({ status: 200, message: 'success without queries' });
  });

  it('should have `POST` method', async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch;
    const successOptions = {
      method: 'POST',
      body: JSON.stringify({ name: 'John', age: 25 }),
    };
    const failOptions = {
      method: 'POST',
    };
    mockFetch.mockImplementation((_url: string, options: Record<'method' | 'body', any>) =>
      options.method === 'POST' && options.body === successOptions.body
        ? Promise.resolve({
            ok: true,
            json: () => ({ status: 200, message: 'success post' }),
          })
        : Promise.reject({
            status: 422,
            message: 'fail',
          }),
    );

    expect(request('testpost', successOptions)).resolves.toStrictEqual({ status: 200, message: 'success post' });
    // expect(request('testpost', failOptions)).rejects.toStrictEqual({ status: 422, message: 'fail' });
  });

  it('should have `PUT` method', async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch;
    const options = {
      method: 'PUT',
      body: JSON.stringify({ name: 'John', age: 25, hobbies: ['reading'] }),
    };
    const promiseReject = { status: 422, message: 'fail on this action' };
    const promiseResolve = { status: 200, message: 'success' };
    mockFetch.mockImplementation((url: string, options: Record<'method' | 'body', any>) => {
      if (!url.includes('testid') || !options.body) return Promise.reject(promiseReject);
      return Promise.resolve({ ok: true, json: () => promiseResolve });
    });

    // expect(request('testput', options)).rejects.toStrictEqual(promiseReject);
    // expect(request('testput/testid', { method: 'PUT' })).rejects.toStrictEqual(promiseReject);
    expect(request('testput/testid', options)).resolves.toStrictEqual(promiseResolve);
  });

  it('should have `DELETE` method', async () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch;
    const options = {
      method: 'DELETE',
    };
    const promiseReject = { status: 422, message: 'fail on this action' };
    const promiseResolve = { status: 200, message: 'success' };
    mockFetch.mockImplementation((url: string, options: Record<'method' | 'body', any>) => {
      if (!url.includes('testid') || options.method !== 'DELETE') return Promise.reject(promiseReject);
      return Promise.resolve({ ok: true, json: () => promiseResolve });
    });

    // expect(request('testdelete', options)).rejects.toStrictEqual(promiseReject)
    // expect(request('testdelete/testid', {})).rejects.toStrictEqual(promiseReject)
    expect(request('testdelete/testid', options)).resolves.toStrictEqual(promiseResolve);
  });

  describe('StringifyParams', () => {
    it('should stringify object with single-level properties', () => {
      const params = { name: 'John', age: 25 };
      expect(stringifyParams(params)).toEqual('age=25&name=John');
    });

    it('should stringify object with array properties', () => {
      const params = { name: 'John', hobbies: ['reading', 'writing'] };
      expect(stringifyParams(params)).toEqual('hobbies=reading,writing&name=John');
    });

    it('should ignore null, undefined and empty string properties', () => {
      const params = { name: 'John', age: null, job: undefined, hobby: '' };
      expect(stringifyParams(params)).toEqual('name=John');
    });
  });

  describe('RequestOptionsTemplate', () => {
    it('should return method and body', () => {
      const method = 'POST';
      const payload = { name: 'John', age: 25 };
      const result = {
        method,
        body: JSON.stringify(payload),
      };

      expect(requestOptionsTemplate(method, payload)).toStrictEqual(result);
    });

    it('should return method `DELETE` without body', () => {
      const method = 'DELETE';
      const result = { method };

      expect(requestOptionsTemplate(method)).toStrictEqual(result);
    });
  });
});
