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

const BUTTON = 'tracking-tight px-3 bg-blue-200 hover:bg-blue-300';

const getOffset = (pagingUrl?: string) => {
  if (!pagingUrl) return undefined;

  return new URL(pagingUrl).searchParams.get('offset') ?? undefined;
};

function Controls({ formRef, paging }: { formRef: React.RefObject<HTMLFormElement>; paging?: Paging }) {
  const submit = useSubmit();

  const onSelectChange = () => {
    submit(formRef.current);
  };

  const loadMore = (type: keyof NonNullable<typeof paging>) => () => {
    const sort = new FormData(formRef.current as HTMLFormElement).get('sort') as string;

    const formData: Record<string, string> = { sort };

    const offset = getOffset(paging?.[type]);
    if (offset) {
      formData.offset = offset;
    }

    // here we want to submit the form manually as we need to control the offset
    submit(formData);
  };

  return (
    <div className="mx-auto max-w-lg mb-6 space-x-2 flex">
      <RankingTypeSelect onChange={onSelectChange} />
      {paging?.previous && (
        <button type="button" onClick={loadMore('previous')} className={BUTTON}>
          Previous
        </button>
      )}
      {paging?.next && (
        <button type="button" onClick={loadMore('next')} className={BUTTON}>
          Next
        </button>
      )}
    </div>
  );
}

export default function TopAnime() {
  const loaderData = useLoaderData<NodeList>();

  const ref = useRef<HTMLFormElement>(null);

  return (
    <Form ref={ref} method="get" replace>
      <h1 className="text-center text-3xl tracking-wide mb-12">Top Anime</h1>
      <Controls formRef={ref} paging={loaderData.paging} />
      <SearchList>
        {(loaderData?.data ?? []).map(({ node }) => (
          <SearchListItem key={node.id} {...node} />
        ))}
      </SearchList>
      <div className="w-full flex justify-center mt-8"></div>
    </Form>
  );
}
