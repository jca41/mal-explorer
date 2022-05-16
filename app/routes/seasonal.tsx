import { LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { useMemo, useRef } from 'react';

import { List, ListItem } from '~/components/list';
import { CurrentPage, PaginationButton, usePaginationSubmit } from '~/components/pagination';
import { RadioGroup, SEASONAL_SORT_RADIOS } from '~/components/radio-group';
import { SEASONAL_SEASON_OPTIONS, SEASONAL_YEAR_OPTIONS, Select } from '~/components/select';
import { StickyHeader } from '~/components/sticky-header';
import { NodeList, Paging, SeasonParam } from '~/contracts/mal';
import { malService } from '~/lib/mal-service.server';
import { getFormData, scrollTop } from '~/utils/html';
import { getCurrentSeason, getCurrentYear } from '~/utils/seasonal';

const LIMIT = 25;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const season = (url.searchParams.get('season') ?? getCurrentSeason()) as SeasonParam;
  const year = url.searchParams.get('year') ?? getCurrentYear();
  const offset = url.searchParams.get('offset');

  return malService({
    type: 'seasonal',
    fields: 'list',
    query: {
      limit: LIMIT,
      offset: offset ? parseInt(offset) : undefined,
      sort: 'anime_num_list_users',
    },
    params: {
      year: typeof year === 'string' ? parseInt(year) : year,
      season,
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

  const currentYear = useMemo(getCurrentYear, []);
  const currentSeason = useMemo(getCurrentSeason, []);

  return (
    <div className="mx-auto max-w-lg flex items-end justify-between">
      <div className="flex gap-x-2">
        <Select name="season" optionMap={SEASONAL_SEASON_OPTIONS} onChange={onSelectChange} defaultValue={currentSeason} />
        <Select name="year" optionMap={SEASONAL_YEAR_OPTIONS} onChange={onSelectChange} defaultValue={currentYear} />
        <PaginationButton paging={paging} type="previous" onClick={submitPreviousPage} />
        <PaginationButton paging={paging} type="next" onClick={submitNextPage} />
      </div>
      <CurrentPage page={currentPage} />
      <div className="block">
        <RadioGroup name="sort" radioMap={SEASONAL_SORT_RADIOS} />
      </div>
    </div>
  );
}

export default function SeasonalAnime() {
  const loaderData = useLoaderData<NodeList>();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form ref={formRef} method="get" replace>
      <h1 className="text-center text-3xl tracking-wide mb-8">Seasonal Anime</h1>
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
