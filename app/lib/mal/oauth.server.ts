import { AuthState } from '~/contracts/auth';

import { CLIENT_ID, CLIENT_SECRET, EXCHANGE_PATH, OAUTH_PATH } from './constants.server';

export const PKCE_VERIFIER = process.env.PKCE_VERIFIER as string;

const REDIRECT_URI = process.env.NODE_ENV === 'development' ? `http://localhost:3000${EXCHANGE_PATH}` : '';

export function getAuthorizationUrl({ state }: { state?: Record<string, string> } = {}) {
  const urlParams = new URLSearchParams({
    client_id: CLIENT_ID,
    code_challenge: PKCE_VERIFIER,
    code_challenge_method: 'plain',
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
  });

  if (state) {
    urlParams.set('state', JSON.stringify(state));
  }

  return `${OAUTH_PATH}/authorize?${urlParams.toString()}`;
}

export async function exchangeTokens(code: string): Promise<AuthState> {
  const urlParams = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    code_verifier: PKCE_VERIFIER,
    grant_type: 'authorization_code',
    code,
  });

  const res = await fetch(`${OAUTH_PATH}/token`, {
    method: 'post',
    body: urlParams.toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const data = await res.json();

  const { token_type, expires_in, access_token, refresh_token } = data;

  return {
    tokenType: token_type,
    expiresIn: expires_in,
    accessToken: access_token,
    refreshToken: refresh_token,
  };
}
