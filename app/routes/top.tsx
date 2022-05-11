import { LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { useRef } from 'react';

import { RankingTypeSelect } from '~/components/ranking-type-select';
import { SearchList, SearchListItem } from '~/components/search-list';
import { NodeList, Paging, RankingTypeParam } from '~/contracts/mal';
import { malService } from '~/lib/mal-service.server';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const sort = url.searchParams.get('sort');
  const offset = url.searchParams.get('offset');

  return malService({
    type: 'top',
    fields: 'list',
    query: {
      ranking_type: (sort || 'all') as RankingTypeParam,
      limit: 25,
      offset: offset ? parseInt(offset) : undefined,
    },
  });
};

const getNextOffset = (paging?: Paging) => {
  if (!paging?.next) return undefined;

  return new URL(paging?.next).searchParams.get('offset') ?? undefined;
};

export default function TopAnime() {
  const loaderData = useLoaderData<NodeList>();
  const submit = useSubmit();
  const ref = useRef<HTMLFormElement>(null);

  const onSelectChange = () => {
    submit(ref.current);
  };

  const onLoadNextClick = () => {
    const sort = new FormData(ref.current as HTMLFormElement).get('sort') as string;

    const formData: Record<string, string> = { sort };

    const offset = getNextOffset(loaderData?.paging);
    if (offset) {
      formData.offset = offset;
    }

    // here we want to submit the form manually as we need to control the offset
    submit(formData);
  };

  return (
    <Form ref={ref} method="get" replace>
      <h1 className="text-center text-3xl tracking-wide mb-12">Top Anime</h1>
      <div className="mx-auto max-w-lg mb-6 flex justify-end">
        <RankingTypeSelect onChange={onSelectChange} />
      </div>
      <SearchList>
        {(loaderData?.data ?? []).map(({ node }) => (
          <SearchListItem key={node.id} {...node} />
        ))}
      </SearchList>
      {loaderData?.paging?.next && (
        <div className="w-full flex justify-center mt-8">
          <button type="button" onClick={() => onLoadNextClick()} className="rounded-xl bg-blue-300 py-2 px-5 shadow-md text-lg tracking-tight">
            Load more
          </button>
        </div>
      )}
    </Form>
  );
}
