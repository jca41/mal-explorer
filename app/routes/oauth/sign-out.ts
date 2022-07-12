import { ActionFunction } from '@remix-run/node';

import { clearAccessTokenCookieHeader } from '~/lib/session.server';

export const action: ActionFunction = async () => {
  return new Response(null, {
    headers: {
      'Set-Cookie': await clearAccessTokenCookieHeader(),
    },
  });
};
