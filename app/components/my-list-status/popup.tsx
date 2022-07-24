import { ClipboardCheckIcon, PencilAltIcon, PlusIcon } from '@heroicons/react/outline';
import { FC } from 'react';

import { ClientAuthState } from '~/contracts/auth';
import { MyListStatus } from '~/contracts/mal';
import { capitalize } from '~/utils/string';

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
      <div className="absolute right-0 bg-red-200 w-20 flex flex-row justify-end">
        <button
          title={capitalize(status)}
          onClick={controls.open}
          className="fixed z-10 bottom-6 rounded-full p-3 bg-blue-600 shadow-lg shadow-slate-500 transition-transform transform hover:scale-110"
        >
          <Icon className="w-6 h-6 md:w-8 md:h-8 stroke-white" />
        </button>
      </div>
      <MyListStatusModal myListStatus={myListStatus} numEpisodes={numEpisodes} controls={controls} />
    </>
  );
}
