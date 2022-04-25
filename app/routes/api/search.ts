import { LoaderFunction } from '@remix-run/node';
import invariant from 'tiny-invariant';

import { malService } from '~/lib/mal-service.server';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const q = url.searchParams.get('q');
  invariant(typeof q === 'string');

  return malService({
    type: 'list',
    query: {
      q,
      limit: 20,
    },
  });
};
