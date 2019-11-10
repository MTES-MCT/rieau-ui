import axios from 'axios';
import Keycloak from 'keycloak-js';

export default class AxiosKeycloak extends Keycloak {
  createAxiosInstance(config) {
    const instance = axios.create(config);

    instance.interceptors.request.use(
      config =>
        new Promise((resolve, reject) =>
          this.updateToken(5)
            .success(() => {
              config.headers.Authorization = 'Bearer ' + this.token;
              resolve(config);
            })
            .error(() => {
              this.login();
            })
        )
    );
    instance.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        if (error.response) {
          if (error.response.data.cause) {
            return Promise.reject(error.response.data.cause);
          } else {
            return Promise.reject(error.response.data);
          }
        } else if (error.request) {
          return Promise.reject(error.request);
        } else {
          return Promise.reject(error);
        }
      }
    );

    return instance;
  }

  static get axios() {
    return axios;
  }
}
