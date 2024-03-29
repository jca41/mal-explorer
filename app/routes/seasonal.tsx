import { LoaderArgs } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { useMemo, useRef } from 'react';

import { Heading } from '~/components/heading';
import { List, ListItem } from '~/components/list';
import { CurrentPage, PaginationButton, usePaginationSubmit } from '~/components/pagination';
import { RadioGroup, SEASONAL_SORT_RADIOS } from '~/components/radio-group';
import { SEASONAL_SEASON_OPTIONS, SEASONAL_YEAR_OPTIONS, Select } from '~/components/select';
import { StickyHeader } from '~/components/sticky-header';
import { LIST_LIMIT } from '~/constants';
import { Paging, SeasonalSortQueryParam, SeasonParam } from '~/contracts/mal';
import malService from '~/lib/mal/api/service.server';
import { getFormData, scrollTop } from '~/utils/html';
import { getCurrentSeason, getCurrentYear } from '~/utils/seasonal';
import { ParsedIntSchema } from '~/utils/zod';

const DEFAULT_SORT = 'anime_score';

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  const season = (url.searchParams.get('season') ?? getCurrentSeason()) as SeasonParam;
  const year = url.searchParams.get('year') ?? getCurrentYear();
  const offset = url.searchParams.get('offset');
  const sort = url.searchParams.get('sort') ?? DEFAULT_SORT;

  return malService.query.seasonalAnime({
    limit: LIST_LIMIT,
    offset: ParsedIntSchema.parse(offset ?? 0),
    sort: sort as SeasonalSortQueryParam,
    year: ParsedIntSchema.parse(year),
    season,
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

  const currentYear = useMemo(getCurrentYear, []);
  const currentSeason = useMemo(getCurrentSeason, []);

  return (
    <div className="mx-auto max-w-lg space-y-3">
      <div className="flex items-end">
        <div className="flex gap-x-2">
          <Select name="season" optionMap={SEASONAL_SEASON_OPTIONS} onChange={onSelectChange} defaultValue={currentSeason} />
          <Select name="year" optionMap={SEASONAL_YEAR_OPTIONS} onChange={onSelectChange} defaultValue={currentYear} />
          <PaginationButton paging={paging} type="next" onClick={submitNextPage} />
          <PaginationButton paging={paging} type="previous" onClick={submitPreviousPage} />
        </div>
      </div>
      <div className="flex justify-between items-end">
        <RadioGroup name="sort" label="Sort by" radioMap={SEASONAL_SORT_RADIOS} onChange={onSelectChange} defaultValue={DEFAULT_SORT} />
        <CurrentPage page={currentPage} />
      </div>
    </div>
  );
}

export default function SeasonalAnime() {
  const loaderData = useLoaderData<typeof loader>();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form ref={formRef} method="get" replace>
      <Heading>Seasonal Anime</Heading>
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
