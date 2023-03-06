import { axiosApi, axiosWToken } from '@/lib/axios';
import { getRefreshToken, removeTokens, setTokens } from '@/utils/token';
import { LoginData, LoginResponse, SignUpData } from './types';

//***** MUTATE */

export const login = (loginData: LoginData) =>
  axiosApi.post<LoginResponse>('auth/login', loginData).then((res) => {
    return res.data;
  });

export const signUp = (signUpData: SignUpData) =>
  axiosApi.post('auth/signup', signUpData).then((res) => {
    return res.data;
  });

export const logOut = () => {
  removeTokens();
};

//***** QUERY */

export const me = () =>
  axiosWToken.get('auth/me').then((res) => {
    return res.data.currentUser;
  });

export const getUserQuery = () => ({
  queryKey: ['user'],
  queryFn: async () => {
    const user = await me();

    return user;
  },
  enabled: !!getRefreshToken(),
});
