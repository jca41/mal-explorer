import { ClipboardCheckIcon, PencilAltIcon, PlusIcon } from '@heroicons/react/outline';
import { FC } from 'react';

import { ClientAuthState } from '~/contracts/auth';
import { MyListStatus } from '~/contracts/mal';
import { capitalize, formatSnakeCase } from '~/utils/string';

import { Modal, useModal } from '../modal';
import { useRouteMatch } from '../use-route-match';
import { MyListStatusProps } from './common';
import { MyListStatusForm } from './form';

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
        <div className="fixed z-10 bottom-6 transition-transform transform hover:scale-110">
          <button onClick={controls.toggle} className="btn btn-secondary rounded-full gap-2 shadow-lg shadow-secondary-content">
            <span className="">{capitalize(formatSnakeCase(status, { capitalize: false }))}</span>
            <Icon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <Modal title="My List" controls={controls}>
        {() => <MyListStatusForm myListStatus={myListStatus} numEpisodes={numEpisodes} controls={controls} />}
      </Modal>
    </>
  );
}
