import { generateChallenge } from 'pkce-challenge';

import { CLIENT_ID, OAUTH_PATH } from './constants';

export const PKCE_VERIFIER = process.env.PKCE_VERIFIER as string;

export function getAuthorizationUrl({ state }: { state?: Record<string, string> } = {}) {
  const urlParams = new URLSearchParams({
    client_id: CLIENT_ID,
    code_challenge: generateChallenge(PKCE_VERIFIER),
    code_challenge_method: 'plain',
    response_type: 'code',
    redirect_uri: 'http://localhost:3000',
  });

  if (state) {
    urlParams.set('state', JSON.stringify(state));
  }

  return `${OAUTH_PATH}/authorize?${urlParams.toString()}`;
}
