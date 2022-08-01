import { LoaderArgs } from '@remix-run/node';
import { Form, useLoaderData, useSearchParams, useSubmit } from '@remix-run/react';
import { useMachine } from '@xstate/react';
import { useRef } from 'react';
import { createMachine } from 'xstate';

import { List, ListItem } from '~/components/list';
import { SearchInput } from '~/components/search-input';
import { malService } from '~/lib/mal/api/service.server';
import { ParentTriggerEvent } from '~/machines/debounce';

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

const searchMachine = createMachine({
  id: 'search',
  tsTypes: {} as import('./index.typegen').Typegen0,
  schema: {
    events: {} as ParentTriggerEvent,
  },
  initial: 'idle',
  on: {
    TRIGGER: [
      {
        target: 'valid',
        internal: false,
        cond: 'isValid',
      },
      { target: 'invalid', internal: false },
    ],
  },
  states: {
    idle: {},
    valid: {
      entry: 'submit',
    },
    invalid: {
      entry: 'reportValidity',
    },
  },
});

export default function Index() {
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

  const loaderData = useLoaderData<typeof loader>();
  const [params] = useSearchParams();

  const [state, , service] = useMachine(searchMachine, {
    devTools: true,
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

  return (
    <div className="flex flex-col space-y-10">
      <Form ref={formRef} method="get" action="/" className="flex flex-row justify-center space-x-2">
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
