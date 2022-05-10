import { LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { useRef } from 'react';

import { RankingTypeSelect } from '~/components/ranking-type-select';
import { SearchList, SearchListItem } from '~/components/search-list';
import { NodeList, RankingTypeParam } from '~/contracts/mal';
import { malService } from '~/lib/mal-service.server';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const sort = url.searchParams.get('sort');

  return malService({
    type: 'top',
    fields: 'list',
    query: {
      ranking_type: (sort || 'all') as RankingTypeParam,
      limit: 20,
    },
  });
};

export default function TopAnime() {
  const loaderData = useLoaderData<NodeList>();
  const submit = useSubmit();
  const ref = useRef<HTMLFormElement>(null);

  const submitForm = () => {
    submit(ref.current);
  };
  return (
    <Form ref={ref} method="get" replace>
      <h1 className="text-center text-3xl tracking-wide mb-12">Top Anime</h1>
      <div className="mx-auto max-w-lg mb-6 flex justify-end">
        <RankingTypeSelect onSubmit={submitForm} />
      </div>
      <SearchList>
        {(loaderData?.data ?? []).map(({ node }) => (
          <SearchListItem key={node.id} {...node} />
        ))}
      </SearchList>
    </Form>
  );
}
