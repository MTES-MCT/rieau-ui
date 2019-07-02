const isApiMock =
  process.env.REACT_APP_API_MOCK === true ||
  process.env.REACT_APP_API_MOCK === 'true' ||
  process.env.REACT_APP_API_MOCK === 1 ||
  process.env.REACT_APP_API_MOCK === '1';

function api() {
  const importApi = isApiMock
    ? import('utils/api-mock')
    : import('utils/api-real');
  return importApi;
}

export default api();
export { isApiMock };
