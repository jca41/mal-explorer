import { LoaderArgs } from '@remix-run/node';
import { Form, useLoaderData, useSearchParams } from '@remix-run/react';

import { List, ListItem } from '~/components/list';
import { malService } from '~/lib/mal/api/service.server';

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  const q = url.searchParams.get('q');

  if (!q) return {};

  return malService({
    type: 'list',
    fields: 'list',
    input: {
      query: {
        q,
        limit: 20,
      },
    },
  });
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const [params] = useSearchParams();

  return (
    <div className="flex flex-col space-y-10">
      <Form method="get" replace action="/" className="flex flex-row justify-center space-x-2">
        <input
          type="text"
          name="q"
          placeholder="Search..."
          required
          defaultValue={params.get('q') ?? ''}
          minLength={3} // min query is 3 chars
          autoComplete="off"
          className="rounded-lg h-12 w-full max-w-xs"
        ></input>
      </Form>
      <List>
        {(loaderData?.data ?? []).map(({ node }) => (
          <ListItem key={node.id} {...node} />
        ))}
      </List>
    </div>
  );
}
