import { clearAccessTokenCookieHeader } from '~/lib/session.server';

export const action = async () => {
  return new Response(null, {
    headers: {
      'Set-Cookie': await clearAccessTokenCookieHeader(),
    },
  });
};
