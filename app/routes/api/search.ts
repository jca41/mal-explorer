import { LoaderFunction } from '@remix-run/node';
import invariant from 'tiny-invariant';

import { MALQuery } from '~/lib/mal-service.server';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const q = url.searchParams.get('q');
  invariant(typeof q === 'string');

  console.log(q);

  return MALQuery({
    type: 'search',
    query: {
      q,
    },
  });
};
