import { CookieOptions, createCookie, redirect } from '@remix-run/node';

import { AuthState } from '~/contracts/auth';

import { getAuthorizationUrl } from './mal/oauth.server';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
};

const accessTokenCookie = createCookie('mal_tk', cookieOptions);

const REFRESH_TOKEN_EXPIRY = 267_8400; // 1 month
const refreshTokenCookie = createCookie('mal_rf', { ...cookieOptions, maxAge: REFRESH_TOKEN_EXPIRY });

export const getAccessToken = (request: Request) => accessTokenCookie.parse(request.headers.get('Cookie'));
export const getRefreshToken = (request: Request) => refreshTokenCookie.parse(request.headers.get('Cookie'));

export async function getNewAccessTokenCookieHeader({ accessToken, expiresIn }: AuthState) {
  return accessTokenCookie.serialize(accessToken, {
    expires: new Date(expiresIn),
    maxAge: expiresIn,
  });
}

export async function clearAccessTokenCookieHeader() {
  return accessTokenCookie.serialize('', {
    maxAge: 0,
  });
}

export async function getNewRefreshTokenCookieHeader({ refreshToken }: AuthState) {
  return refreshTokenCookie.serialize(refreshToken);
}

export async function getAccessTokenOrRedirect(request: Request) {
  const accessToken = await getAccessToken(request);
  if (!accessToken) {
    throw redirect(getAuthorizationUrl());
  }

  return accessToken;
}
