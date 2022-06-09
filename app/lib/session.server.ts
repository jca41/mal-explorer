import { CookieOptions, createCookie } from '@remix-run/node';

import { AuthState } from '~/contracts/auth';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
};

const accessTokenCookie = createCookie('mal_tk', cookieOptions);

const REFRESH_TOKEN_EXPIRY = 267_8400; // 1 month
const refreshTokenCookie = createCookie('mal_rf', { ...cookieOptions, maxAge: REFRESH_TOKEN_EXPIRY });

export const getAccessToken = (request: Request) => accessTokenCookie.parse(request.headers.get('Cookie'));

export async function getNewAccessTokenCookieHeader({ accessToken, expiresIn }: AuthState) {
  return accessTokenCookie.serialize(accessToken, {
    expires: new Date(expiresIn),
    maxAge: expiresIn,
  });
}

export async function getNewRefreshTokenCookieHeader({ refreshToken }: AuthState) {
  return refreshTokenCookie.serialize(refreshToken);
}
