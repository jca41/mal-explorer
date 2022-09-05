import { LoaderArgs } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { useRef } from 'react';

import { Heading } from '~/components/heading';
import { List, ListItem } from '~/components/list';
import { CurrentPage, PaginationButton, usePaginationSubmit } from '~/components/pagination';
import { RANKING_TYPES_OPTIONS, Select } from '~/components/select';
import { StickyHeader } from '~/components/sticky-header';
import { LIST_LIMIT } from '~/constants';
import { Paging, RankingTypeParam } from '~/contracts/mal';
import malService from '~/lib/mal/api/service.server';
import { getFormData, scrollTop } from '~/utils/html';
import { ParsedIntSchema } from '~/utils/zod';

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  const sort = url.searchParams.get('sort');
  const offset = url.searchParams.get('offset');

  return malService.query.topAnime({
    ranking_type: (sort || 'all') as RankingTypeParam,
    limit: LIST_LIMIT,
    offset: ParsedIntSchema.parse(offset ?? 0),
  });
}

function Controls({ paging, formRef }: { paging?: Paging; formRef: React.RefObject<HTMLFormElement> }) {
  const submit = useSubmit();

  const { currentPage, submitNextPage, submitPreviousPage } = usePaginationSubmit({
    paging,
    limit: LIST_LIMIT,
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
  const loaderData = useLoaderData<typeof loader>();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form ref={formRef} method="get" replace>
      <Heading>Top Anime</Heading>
      <StickyHeader>
        <Controls formRef={formRef} paging={loaderData?.paging} />
      </StickyHeader>
      <div className="mt-2">
        <List>
          {(loaderData?.data ?? []).map(({ node }) => (
            <ListItem key={node.id} {...node} />
          ))}
        </List>
      </div>
    </Form>
  );
}
