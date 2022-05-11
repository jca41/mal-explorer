import { LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { useRef } from 'react';

import { List, ListItem } from '~/components/list';
import { RankingTypeSelect } from '~/components/ranking-type-select';
import { NodeList, Paging, RankingTypeParam } from '~/contracts/mal';
import { malService } from '~/lib/mal-service.server';
import { getOffset, getPageNumber } from '~/utils/paging';

const LIMIT = 25;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const sort = url.searchParams.get('sort');
  const offset = url.searchParams.get('offset');

  return malService({
    type: 'top',
    fields: 'list',
    query: {
      ranking_type: (sort || 'all') as RankingTypeParam,
      limit: LIMIT,
      offset: offset ? parseInt(offset) : undefined,
    },
  });
};

const BUTTON = 'tracking-tight py-2 px-3 bg-blue-200 hover:bg-blue-400 transition-colors';

function Pagination({ paging, formRef }: { paging?: Paging; formRef: React.RefObject<HTMLFormElement> }) {
  const submit = useSubmit();

  const loadMore = (type: keyof NonNullable<typeof paging>) => () => {
    const sort = new FormData(formRef.current as HTMLFormElement).get('sort') as string;

    const formData: Record<string, string> = { sort };

    const offset = getOffset(paging?.[type]);
    if (offset) {
      formData.offset = offset;
    }

    window?.scrollTo({ top: 0, behavior: 'smooth' });

    // here we want to submit the form manually as we need to control the offset
    submit(formData);
  };

  return (
    <div className="mx-auto max-w-lg mt-6 space-x-2 flex justify-center">
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
  const submit = useSubmit();

  const formRef = useRef<HTMLFormElement>(null);

  const onSelectChange = () => {
    submit(formRef.current);
  };

  const currentPage = getPageNumber({ paging: loaderData.paging, limit: LIMIT });

  return (
    <Form ref={formRef} method="get" replace>
      <h1 className="text-center text-3xl tracking-wide mb-12">Top Anime</h1>
      <div className="mx-auto max-w-lg mb-6 flex items-end justify-between">
        <RankingTypeSelect onChange={onSelectChange} />
        {!!currentPage && <span className="h-min text-slate-600 font-semibold">Page {currentPage}</span>}
      </div>
      <List>
        {(loaderData?.data ?? []).map(({ node }) => (
          <ListItem key={node.id} {...node} />
        ))}
      </List>
      <Pagination formRef={formRef} paging={loaderData?.paging} />
    </Form>
  );
}
