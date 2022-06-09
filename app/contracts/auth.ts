export type AuthState = {
  tokenType: 'Bearer';
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
};
