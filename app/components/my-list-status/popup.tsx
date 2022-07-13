import { PencilAltIcon } from '@heroicons/react/outline';

import { Node } from '~/contracts/mal';

type MyListStatusPopupProps = {
  myListStatus?: Node['my_list_status'];
};

export function MyListStatusPopup({ myListStatus }: MyListStatusPopupProps) {
  if (!myListStatus) return null;

  return (
    <div className="absolute right-0 bg-red-200 w-20 flex flex-row justify-end">
      <button
        title={myListStatus?.status}
        className="fixed z-10 bottom-4 rounded-full p-2 bg-blue-600 shadow-lg shadow-slate-500 transition-transform transform hover:scale-110"
      >
        <PencilAltIcon className="w-10 h-10 stroke-white" />
      </button>
    </div>
  );
}
