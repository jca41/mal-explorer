import { ClipboardCheckIcon, PencilAltIcon, PlusIcon } from '@heroicons/react/outline';
import { FC } from 'react';

import { ClientAuthState } from '~/contracts/auth';
import { MyListStatus } from '~/contracts/mal';
import { capitalize, formatSnakeCase } from '~/utils/string';

import { useModal } from '../modal';
import { useRouteMatch } from '../use-route-match';
import { MyListStatusProps } from './common';
import { MyListStatusModal } from './modal';

const STATUS_TO_ICONS: Record<MyListStatus['status'] | 'add', FC<{ className: string }>> = {
  completed: ClipboardCheckIcon,
  plan_to_watch: PencilAltIcon,
  dropped: PencilAltIcon,
  on_hold: PencilAltIcon,
  watching: PencilAltIcon,
  add: PlusIcon,
};

export function MyListStatusPopup({ myListStatus, numEpisodes }: MyListStatusProps) {
  const { signedIn } = useRouteMatch<{ data: ClientAuthState }>('root').data;
  const controls = useModal();
  if (!signedIn) return null;

  const status = myListStatus?.status ?? 'add';

  const Icon = STATUS_TO_ICONS[status];

  return (
    <>
      <div className="absolute right-0 flex flex-row justify-end w-32">
        <div className="fixed z-10 bottom-6 rounded-full bg-blue-600 shadow-lg shadow-slate-500 transition-transform transform hover:scale-110">
          <button onClick={controls.open} className="flex flex-row items-center px-3 py-2.5">
            <span className="mr-2 text-sm text-white font-semibold tracking-tight">{capitalize(formatSnakeCase(status, { capitalize: false }))}</span>
            <Icon className="w-5 h-5 stroke-white" />
          </button>
        </div>
      </div>
      <MyListStatusModal myListStatus={myListStatus} numEpisodes={numEpisodes} controls={controls} />
    </>
  );
}
