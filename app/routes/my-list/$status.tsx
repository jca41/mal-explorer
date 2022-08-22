import { LoaderArgs, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { LIST_LIMIT } from '~/constants';
import { MyListSortQueryParam, MyListStatus } from '~/contracts/mal';
import malService from '~/lib/mal/api/service.server';
import { getAuthorizationUrl } from '~/lib/mal/oauth.server';
import { getAccessToken } from '~/lib/session.server';
export async function loader({ request, params }: LoaderArgs) {
  const accessToken = await getAccessToken(request);
  if (!accessToken) {
    return redirect(getAuthorizationUrl());
  }

  const url = new URL(request.url);
  const sort = url.searchParams.get('sort');
  const offset = url.searchParams.get('offset');

  const status = (params?.status ?? 'watching') as MyListStatus['status'];

  return malService.query.myList({
    status,
    limit: LIST_LIMIT,
    sort: (sort || 'anime_title') as MyListSortQueryParam,
    offset: offset ? parseInt(offset) : 0,
    accessToken,
  });
}
export default function MyListStatus() {
  const data = useLoaderData<typeof loader>();
  return <div>{JSON.stringify(data)}</div>;
}
