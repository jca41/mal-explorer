import { generateChallenge } from 'pkce-challenge';

import { CLIENT_ID, OAUTH_PATH } from './constants';

export const PKCE_VERIFIER = process.env.PKCE_VERIFIER as string;
const REDIRECT_URI = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

//http://localhost:3000/?code=def50200e9cf0f24bfff8c0fe60dd28eca53b9c269e8bd52c0f26ebb2c7c3902ff6ef4d167940a0addc030126908f0a45a8e3a37c9c0e5f0811a0121fdd367b10016d81960701bc41fae45c7c7a8055f450f0ea47dd057fcd8443c83828e8dca34d5d06aba1d36cc307a55d5ac0f1222735f04f9f2ad9dd01f67aca7b77d27fcb59fbb0b95637afc9c187f2870e2f5c3436f681cf38e5eea13326d60595aac51ddf97651d29ecfd2c87d17e3683ac48ccb243212b347f6cea870557dda8ac68ef2a030ff6afa4fc74f698b8ef02b70328efff178a245b2c724076bb1eefafd1c5d8e7cdcca5a99eb3c807e8f1c0c765b5317194494b1cc779f450a86d1030aeb38193ed674f748555ed2fc8d9fe63cf689e3ff3d6fe08a276b6ae521bb931e2a84dae2899c57cf730eec591cb1d1c93fcac02b0970cd2e1c86317a2716cd4b425273993ee96cd773c5647c222f3ae2144931c548af29a55d21250890c7d8b2037b0856f30d55fda5af6b9420607b98205bc96198c4754298a4ec3684a50fde340d2f1514b132ba388463dc7ea1602ef13c28473c8288bae194ba2c0871d9c59d532eee003754bf910c

export function getAuthorizationUrl({ state }: { state?: Record<string, string> } = {}) {
  const urlParams = new URLSearchParams({
    client_id: CLIENT_ID,
    code_challenge: generateChallenge(PKCE_VERIFIER),
    code_challenge_method: 'plain',
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
  });

  if (state) {
    urlParams.set('state', JSON.stringify(state));
  }

  return `${OAUTH_PATH}/authorize?${urlParams.toString()}`;
}
