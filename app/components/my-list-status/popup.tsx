import { ClipboardCheckIcon, PencilAltIcon, PlusIcon } from '@heroicons/react/outline';
import { Link } from '@remix-run/react';
import { FC } from 'react';

import { ClientAuthState } from '~/contracts/auth';
import { MyListStatus } from '~/contracts/mal';
import { capitalize, formatSnakeCase } from '~/utils/primitives';

import { useRouteMatch } from '../use-route-match';
import { MyListStatusProps } from './common';

const STATUS_TO_ICONS: Record<NonNullable<MyListStatus['status']> | 'add', FC<{ className: string }>> = {
  completed: ClipboardCheckIcon,
  plan_to_watch: PencilAltIcon,
  dropped: PencilAltIcon,
  on_hold: PencilAltIcon,
  watching: PencilAltIcon,
  add: PlusIcon,
};

export function MyListStatusPopup({ myListStatus }: MyListStatusProps) {
  const { data: { signedIn } = {} } = useRouteMatch<{ data: ClientAuthState }>('root');
  if (!signedIn) return null;

  const status = myListStatus?.status ?? 'add';

  const Icon = STATUS_TO_ICONS[status];

  return (
    <>
      <div className="absolute right-0 flex w-32 flex-row justify-end">
        <div className="fixed bottom-6 z-20 transform transition-transform hover:scale-110">
          <Link
            prefetch="intent"
            to="./my-list"
            className="btn btn-secondary flex-nowrap gap-2 whitespace-pre rounded-full shadow-lg shadow-secondary/30"
          >
            <span className="my-list">{capitalize(formatSnakeCase(status, { capitalize: false }))}</span>
            <Icon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </>
  );
}
