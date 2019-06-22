function api() {
  var importApi = import('utils/api-mock');
  switch (process.env.NODE_ENV) {
    case 'production':
      window.console.log('api-real');
      importApi = import('utils/api-real');
      break;
    case 'development':
      window.console.log('api-mock');
      importApi = import('utils/api-mock');
      break;
    case 'test':
      window.console.log('api-mock');
      importApi = import('utils/api-mock');
      break;
    default:
      window.console.log('api-mock');
      importApi = import('utils/api-mock');
  }
  return importApi;
}

export default api();
