import { LoaderFunction, redirect } from '@remix-run/node';

import { exchangeTokens } from '~/lib/mal/oauth.server';
import { getNewAccessTokenCookieHeader, getNewRefreshTokenCookieHeader } from '~/lib/session.server';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const code = url.searchParams.get('code');

  if (!code) return redirect('/');

  const authState = await exchangeTokens(code);

  const headers = new Headers();

  headers.append('Set-Cookie', await getNewAccessTokenCookieHeader(authState));
  headers.append('Set-Cookie', await getNewRefreshTokenCookieHeader(authState));

  return redirect('/', {
    headers: headers,
  });
};
