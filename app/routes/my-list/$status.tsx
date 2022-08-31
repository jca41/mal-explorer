import { LoaderArgs, redirect } from '@remix-run/node';
import { Form, useLoaderData, useParams, useSubmit } from '@remix-run/react';
import { useRef } from 'react';

import { List, ListItem } from '~/components/list';
import { CardDetail } from '~/components/my-list-status/card-detail';
import { CurrentPage, PaginationButton, usePaginationSubmit } from '~/components/pagination';
import { MY_LIST_SORT_OPTIONS, Select } from '~/components/select';
import { StickyHeader } from '~/components/sticky-header';
import { LIST_LIMIT } from '~/constants';
import { MyListSortQueryParam, MyListStatus, Paging } from '~/contracts/mal';
import malService from '~/lib/mal/api/service.server';
import { getAuthorizationUrl } from '~/lib/mal/oauth.server';
import { getAccessToken } from '~/lib/session.server';
import { getFormData, scrollTop } from '~/utils/html';

export async function loader({ request, params }: LoaderArgs) {
  const accessToken = await getAccessToken(request);
  if (!accessToken) {
    redirect(getAuthorizationUrl());
    return;
  }

  const url = new URL(request.url);
  const sort = url.searchParams.get('sort');
  const offset = url.searchParams.get('offset');

  const status = (params?.status ?? 'watching') as MyListStatus['status'];

  return malService.query.myList({
    status,
    limit: LIST_LIMIT,
    sort: (sort || 'anime_title') as MyListSortQueryParam,
    offset: offset ? parseInt(offset) : 0,
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

  const onSelectChange = () => {
    submit(formRef.current);
    scrollTop();
  };

  return (
    <div className="mx-auto max-w-lg flex items-end justify-between">
      <div className="flex gap-x-2">
        <Select name="sort" optionMap={MY_LIST_SORT_OPTIONS} onChange={onSelectChange} defaultValue="anime_title" />
        <PaginationButton paging={paging} type="next" onClick={submitNextPage} />
        <PaginationButton paging={paging} type="previous" onClick={submitPreviousPage} />
      </div>
      <CurrentPage page={currentPage} />
    </div>
  );
}

export default function MyListStatus() {
  const loaderData = useLoaderData<typeof loader>();
  const formRef = useRef<HTMLFormElement>(null);
  const { status } = useParams();

  return (
    <Form ref={formRef} className="mt-6" method="get" replace>
      <StickyHeader>
        <Controls key={status} formRef={formRef} paging={loaderData?.paging} />
      </StickyHeader>
      <div className="mt-2">
        <List>
          {(loaderData?.data ?? []).map(({ node, list_status }) => (
            <ListItem key={node.id} {...node}>
              <CardDetail listStatus={list_status} />
            </ListItem>
          ))}
        </List>
      </div>
    </Form>
  );
}
