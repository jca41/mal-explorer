import { ClipboardCheckIcon, PencilAltIcon, PlusIcon } from '@heroicons/react/outline';
import { FC } from 'react';

import { ClientAuthState } from '~/contracts/auth';
import { MyListStatus } from '~/contracts/mal';
import { capitalize } from '~/utils/string';

import { useRouteMatch } from '../use-route-match';

type MyListStatusPopupProps = {
  myListStatus?: MyListStatus;
};

const STATUS_TO_ICONS: Record<MyListStatus['status'] | 'add', FC<{ className: string }>> = {
  completed: ClipboardCheckIcon,
  plan_to_watch: PencilAltIcon,
  add: PlusIcon,
};

export function MyListStatusPopup({ myListStatus }: MyListStatusPopupProps) {
  const { signedIn } = useRouteMatch<{ data: ClientAuthState }>('root').data;

  if (!signedIn) return null;

  const status = myListStatus?.status ?? 'add';

  const Icon = STATUS_TO_ICONS[status];

  return (
    <div className="absolute right-0 bg-red-200 w-20 flex flex-row justify-end">
      <button
        title={capitalize(status)}
        className="fixed z-10 bottom-6 rounded-full p-3 bg-blue-600 shadow-lg shadow-slate-500 transition-transform transform hover:scale-110"
      >
        <Icon className="w-8 h-8 stroke-white" />
      </button>
    </div>
  );
}
