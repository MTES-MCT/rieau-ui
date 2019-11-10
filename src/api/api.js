import { env } from 'config/env-helper';

const isApiMock = [true, 'true', 1, '1'].includes(env('REACT_APP_API_MOCK'));

function api() {
  const importApi = isApiMock
    ? import('api/mock/api-mock')
    : import('api/api-real');
  return importApi;
}

export default api();
export { isApiMock };
