export const setTokens = (tokens: {
  access_token: string;
  refresh_token: string;
}) => {
  sessionStorage.setItem('access_token', tokens.access_token);
  localStorage.setItem('refresh_token', tokens.refresh_token);
};
export const getAccessToken = () => {
  return sessionStorage.getItem('access_token');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token');
};

export const removeTokens = () => {
  localStorage.removeItem('refresh_token');
  sessionStorage.removeItem('access_token');
};
