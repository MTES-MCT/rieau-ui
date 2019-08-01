import { env } from 'utils/env-helper';
const isApiMock = [true, 'true', 1, '1'].includes(env('REACT_APP_API_MOCK'));

function api() {
  const importApi = isApiMock
    ? import('utils/api-mock')
    : import('utils/api-real');
  return importApi;
}

export default api();
export { isApiMock };
