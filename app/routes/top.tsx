import { LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { useRef } from 'react';

import { List, ListItem } from '~/components/list';
import { CurrentPage, PaginationButton, usePaginationSubmit } from '~/components/pagination';
import { RANKING_TYPES_OPTIONS, Select } from '~/components/select';
import { StickyHeader } from '~/components/sticky-header';
import { NodeList, Paging, RankingTypeParam } from '~/contracts/mal';
import { malService } from '~/lib/mal/api/service.server';
import { getFormData, scrollTop } from '~/utils/html';

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
      offset: offset ? parseInt(offset) : 0,
    },
  });
};

function Controls({ paging, formRef }: { paging?: Paging; formRef: React.RefObject<HTMLFormElement> }) {
  const submit = useSubmit();

  const { currentPage, submitNextPage, submitPreviousPage } = usePaginationSubmit({
    formRef,
    paging,
    limit: LIMIT,
    onSubmit: (offset?: string) => {
      const formData = getFormData(formRef.current);

      if (offset) {
        formData.offset = offset;
      }

      // here we want to submit the form manually as we need to control the offset
      submit(formData);
      scrollTop();
    },
  });

  const onSelectChange = () => {
    submit(formRef.current);
    scrollTop();
  };

  return (
    <div className="mx-auto max-w-lg flex items-end justify-between">
      <div className="flex gap-x-2">
        <Select name="sort" optionMap={RANKING_TYPES_OPTIONS} onChange={onSelectChange} defaultValue="all" />
        <PaginationButton paging={paging} type="next" onClick={submitNextPage} />
        <PaginationButton paging={paging} type="previous" onClick={submitPreviousPage} />
      </div>
      <CurrentPage page={currentPage} />
    </div>
  );
}

export default function TopAnime() {
  const loaderData = useLoaderData<NodeList>();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form ref={formRef} method="get" replace>
      <h1 className="text-center text-3xl tracking-wide mb-8">Top Anime</h1>
      <StickyHeader>
        <Controls formRef={formRef} paging={loaderData?.paging} />
      </StickyHeader>
      <List>
        {(loaderData?.data ?? []).map(({ node }) => (
          <ListItem key={node.id} {...node} />
        ))}
      </List>
    </Form>
  );
}
