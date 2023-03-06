import { useUI } from '@/components/ui/context';
import { getRefreshToken, setTokens } from '../utils/token';
import { config } from 'dotenv';
import { VITE_APP_API_URL } from '@/config';
import { getAccessToken } from '@/utils/token';
import axios from 'axios';

axios.defaults.baseURL = VITE_APP_API_URL;

axios.defaults.withCredentials = true;

export const axiosApi = axios.create();

export const axiosWToken = axios.create();

axiosWToken.interceptors.request.use(
  async (config) => {
    if (config.url === 'auth/login' || config.url === 'auth/signup')
      return config;

    const access_token = getAccessToken();

    // config.headers = {
    //   // ...config.headers,
    //   Authorization: `Bearer ${access_token}`,
    //   Accept: 'application/json',
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // };
    config.headers.Authorization = `Bearer ${access_token || ''}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosWToken.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response, config } = error;

    if (response.status !== 401) {
      return Promise.reject(error);
    }

    // Use a 'clean' instance of axios without the interceptor to refresh the token. No more infinite refresh loop.
    return axios
      .post('/auth/refresh', {
        refreshToken: getRefreshToken(),
      })
      .then((res) => {
        // update the token and Authorization header
        setTokens(res.data.tokens);
        config.headers['Authorization'] =
          'Bearer ' + res.data.tokens.access_token;
        return axiosWToken(config);
      })
      .catch((error) => {
        window.location.href = '/required_login';
        return Promise.reject(error);
      });
  }
);
