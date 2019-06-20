function api() {
  var importApi = import('utils/api-mock');
  switch (process.env.NODE_ENV) {
    case 'production':
      importApi = import('utils/api-real');
      break;
    case 'development':
      importApi = import('utils/api-real');
      break;
    case 'test':
      importApi = import('utils/api-mock');
      break;
    default:
      importApi = import('utils/api-mock');
  }
  return importApi;
}

export default api();
