import { LoaderArgs } from '@remix-run/node';
import { Form, useLoaderData, useSearchParams, useSubmit } from '@remix-run/react';
import { useRef } from 'react';

import { List, ListItem } from '~/components/list';
import { SearchInput } from '~/components/search-input';
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
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

  const loaderData = useLoaderData<typeof loader>();
  const [params] = useSearchParams();

  const submitForm = () => {
    const form = formRef.current ?? undefined;

    const query = new FormData(form).get('q') ?? '';

    if (!form || typeof query !== 'string') {
      return;
    }

    const valid = form.checkValidity();

    if (valid) {
      submit(form, { replace: true });
    } else {
      form.reportValidity();
    }
  };

  return (
    <div className="flex flex-col space-y-10">
      <Form ref={formRef} method="get" action="/" className="flex flex-row justify-center space-x-2">
        <SearchInput defaultValue={params.get('q') ?? ''} onChange={submitForm} />
      </Form>
      <List>
        {(loaderData?.data ?? []).map(({ node }) => (
          <ListItem key={node.id} {...node} />
        ))}
      </List>
    </div>
  );
}
