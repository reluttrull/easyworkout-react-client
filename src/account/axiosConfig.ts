import axios from 'axios';

export const setupAxiosInterceptors = (
  getAccessToken: () => string | null,
  getRefreshToken: () => string | null,
  setTokens: (access:string, refresh:string) => void
) => {
  axios.defaults.headers.ContentType = 'application/json';
  axios.defaults.headers.Accept = 'application/json';
  axios.interceptors.request.use(
    (config) => {
      const accessToken = getAccessToken();
      if (accessToken) {
        axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status == 401 && !originalRequest._retry && !originalRequest.url.includes('/api/auth/refresh')) {
        originalRequest._retry = true;
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          window.location.href = '/login';
          return Promise.reject(error);
        }
        await axios.post(`${import.meta.env.VITE_BASE_ACCOUNT_API_URL}/api/auth/refresh`,
          { refreshToken })
          .then(({ data }) => {
            setTokens(data.accessToken, data.refreshToken);
            axios.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return axios(originalRequest);
          });
      }
      return Promise.reject(error);
    }
  );
};