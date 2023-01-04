import { LoaderArgs } from '@remix-run/node';
import { Form, useLoaderData, useSearchParams, useSubmit } from '@remix-run/react';
import { useMachine } from '@xstate/react';
import { KeyboardEvent, useCallback, useRef } from 'react';

import { router } from '~/backend/router.server';
import { List, ListItem } from '~/components/list';
import { SearchInput } from '~/components/search-input';
import { searchMachine } from '~/machines/search';

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  const q = url.searchParams.get('q');

  if (!q) return {};

  const be = router.createCaller({});

  return be.animeList({ q, limit: 20 });
}

export default function Index() {
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

  const loaderData = useLoaderData<typeof loader>();
  const [params] = useSearchParams();

  const [state, , service] = useMachine(searchMachine, {
    actions: {
      submit: () => submit(formRef.current, { replace: true }),
      reportValidity: () => {
        formRef.current?.reportValidity();
      },
    },
    guards: {
      isValid: () => formRef.current?.checkValidity() ?? false,
    },
  });

  // input is submitting on enter as it's the only form field, this is breaking the debounced state
  const onKeyDown = useCallback((e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      return false;
    }
  }, []);

  return (
    <div className="flex flex-col space-y-10">
      <Form ref={formRef} onKeyDown={onKeyDown} method="get" action="/" className="flex flex-row justify-center space-x-2">
        <SearchInput defaultValue={params.get('q') ?? ''} parentService={service} />
      </Form>
      {!state.matches('invalid') && (
        <List>
          {(loaderData?.data ?? []).map(({ node }) => (
            <ListItem key={node.id} {...node} />
          ))}
        </List>
      )}
    </div>
  );
}
