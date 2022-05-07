import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { SearchList, SearchListItem } from '~/components/search-list';
import { NodeList } from '~/contracts/mal';
import { malService } from '~/lib/mal-service.server';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const q = url.searchParams.get('q');

  return malService({
    type: 'top',
    fields: 'list',
    query: {
      ranking_type: 'all',
      limit: 20,
    },
  });
};

export default function TopAnime() {
  const loaderData = useLoaderData<NodeList>();

  return (
    <div>
      <h1 className="text-center text-3xl tracking-wide mb-12">Top Anime</h1>
      <SearchList>
        {(loaderData?.data ?? []).map(({ node }) => (
          <SearchListItem key={node.id} {...node} />
        ))}
      </SearchList>
    </div>
  );
}
