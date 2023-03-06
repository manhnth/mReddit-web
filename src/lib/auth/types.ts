export interface LoginData {
  username: string;
  password: string;
}

export interface SignUpData {
  email: string;
  username: string;
  password: string;
}

export interface LoginResponse {
  findUser: any;
  tokens: {
    refresh_token: string;
    access_token: string;
  };
}
