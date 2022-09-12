import { LoaderArgs } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { useRef } from 'react';

import { Heading } from '~/components/heading';
import { List, ListItem } from '~/components/list';
import { CurrentPage, PaginationButton, usePaginationSubmit } from '~/components/pagination';
import { StickyHeader } from '~/components/sticky-header';
import { LIST_LIMIT } from '~/constants';
import { Paging } from '~/contracts/mal';
import malService from '~/lib/mal/api/service.server';
import { getAccessTokenOrRedirect } from '~/lib/session.server';
import { getFormData, scrollTop } from '~/utils/html';
import { ParsedIntSchema } from '~/utils/zod';

export async function loader({ request }: LoaderArgs) {
  const accessToken = await getAccessTokenOrRedirect(request);

  const url = new URL(request.url);
  const offset = url.searchParams.get('offset');

  return malService.query.suggestedAnime({
    limit: LIST_LIMIT,
    offset: ParsedIntSchema.parse(offset ?? 0),
    accessToken,
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

  return (
    <div className="mx-auto flex max-w-lg items-end justify-between">
      <div className="flex gap-x-2">
        <PaginationButton paging={paging} type="next" onClick={submitNextPage} />
        <PaginationButton paging={paging} type="previous" onClick={submitPreviousPage} />
      </div>
      <CurrentPage page={currentPage} />
    </div>
  );
}

export default function SuggestedAnime() {
  const loaderData = useLoaderData<typeof loader>();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form ref={formRef} method="get" replace>
      <Heading>My Anime Suggestions</Heading>
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
