import axios from 'axios';

export const setupAxiosInterceptors = (getAccessToken: () => string | null) => {
  axios.interceptors.request.use(
    (config) => {
      const accessToken = getAccessToken();
      console.log('in interceptor, we see token', accessToken);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      console.log('and headers look like ', config.headers);
      return config;
    },
    (error) => {
      console.log('but we got an error', error);
      Promise.reject(error);
    }
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