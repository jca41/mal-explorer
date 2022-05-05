import { useFetcher } from '@remix-run/react';

import { SearchList, SearchListItem } from '~/components/search-list';
import { NodeList } from '~/contracts/mal';

export default function Index() {
  const fetcher = useFetcher<NodeList>();

  return (
    <div className="flex flex-col space-y-10">
      <fetcher.Form method="get" action="/api/search" className="flex flex-row justify-center space-x-2">
        <input
          type="text"
          name="q"
          placeholder="Search..."
          required
          minLength={3} // min query is 3 chars
          autoComplete="off"
          className="rounded-lg h-12 w-full max-w-xs"
        ></input>
      </fetcher.Form>
      <SearchList>
        {(fetcher?.data?.data ?? []).map(({ node }) => (
          <SearchListItem key={node.id} {...node} />
        ))}
      </SearchList>
    </div>
  );
}
