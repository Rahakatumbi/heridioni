import axios from 'axios'
import store from '../store'

export default () => {
    const api= axios.create({
        baseURL: `http://13.245.137.226:8080/api/v1`,
        // baseURL:`http://localhost:8080/api/v1`,
        headers: {
          Authorization: `Bearer ${store.state.token}`
        }
      })
        api.interceptors.request.use(function (config) {
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        api.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
  return  api
}