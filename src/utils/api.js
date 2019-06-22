function api() {
  const importApi = process.env.REACT_APP_API_MOCK
    ? import('utils/api-mock')
    : import('utils/api-real');
  return importApi;
}

export default api();
