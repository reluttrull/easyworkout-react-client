import axios from 'axios';

export const setupAxiosInterceptors = (getAccessToken: () => string | null) => {
  axios.interceptors.request.use(
    (config) => {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status == 401) {
        console.log('token expired, we will eventually try refresh here');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};