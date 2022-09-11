import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { ActionArgs, redirect } from '@remix-run/node';
import { useActionData, useNavigate, useTransition } from '@remix-run/react';
import { useEffect } from 'react';

import { RouteModal } from '~/components/modal';
import { MyListStatusForm } from '~/components/my-list-status/form';
import { useRouteMatch } from '~/components/use-route-match';
import { MyListStatus, Node } from '~/contracts/mal';
import { isMalError, MalError } from '~/lib/mal/api/errors';
import { editMyListEntry } from '~/lib/mal/api/mutations';
import malService from '~/lib/mal/api/service.server';
import { getAuthorizationUrl } from '~/lib/mal/oauth.server';
import { getAccessToken } from '~/lib/session.server';
import { getActionFormValues, getListStatusDiff } from '~/utils/list-status.server';
import { formatSnakeCase } from '~/utils/primitives';
import { ParsedIntSchema } from '~/utils/zod';

export async function action({ params, request }: ActionArgs) {
  const accessToken = await getAccessToken(request);
  if (!accessToken) {
    redirect(getAuthorizationUrl());
    return;
  }

  const formData = await request.formData();

  const { action, currentListStatus, updatedListStatus, numEpisodes } = getActionFormValues(formData);

  const id = ParsedIntSchema.parse(params.id);

  switch (action) {
    case 'delete':
      return malService.mutate.deleteMyListEntry({ id, accessToken });
    case 'edit':
      //eslint-disable-next-line no-case-declarations
      const diff = getListStatusDiff({ currentListStatus, updatedListStatus, numEpisodes });
      return Object.keys(diff).length > 0 ? editMyListEntry({ id, accessToken, ...diff }) : {};
    default:
      return { unhandled: true };
  }
}

export default function EditMyListStatus() {
  const { data } = useRouteMatch<{ data: Node }>('routes/anime/$id');
  const actionData = useActionData<MalError | MyListStatus | void>();
  const transition = useTransition();
  const navigate = useNavigate();

  useEffect(() => {
    const actionReturnAndLoadersFetched = transition.state === 'idle';
    if (actionReturnAndLoadersFetched && !!actionData && !isMalError(actionData)) {
      navigate(-1);
    }
  }, [transition.state, actionData]);

  return (
    <RouteModal title="My List">
      {
        <>
          {!!actionData && isMalError(actionData) ? (
            <div className="alert alert-error animate-fade-in-fast">
              <div>
                <ExclamationCircleIcon className="w-5" />
                <span>{formatSnakeCase(actionData.error)}</span>
              </div>
              <div>{actionData.message || ''}</div>
            </div>
          ) : null}
          <MyListStatusForm myListStatus={data.my_list_status} numEpisodes={data.num_episodes} />
        </>
      }
    </RouteModal>
  );
}
