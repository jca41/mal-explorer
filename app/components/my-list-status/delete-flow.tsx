import { Transition } from '@headlessui/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import { useState } from 'react';

import { FADE_TRANSITION } from '../transitions';

const CL = {
  icon: 'w-7 h-7',
};
export function DeleteFlow() {
  const [requested, setRequested] = useState(false);
  return (
    <div className="flex justify-between h-6">
      <button className="text-sm text-red-500 hover:underline" type="button" onClick={() => setRequested(true)}>
        Delete from my list
      </button>

      <Transition show={requested} className="flex items-center" {...FADE_TRANSITION}>
        <span className="text-sm text-slate-600">Are you sure?</span>
        <div className="flex ml-2 space-x-0.5">
          <button type="button" onClick={() => setRequested(false)}>
            <XCircleIcon className={CL.icon} />
          </button>
          <button type="submit" name="_action" value="delete">
            <CheckCircleIcon className={`${CL.icon} stroke-red-500`} />
          </button>
        </div>
      </Transition>
    </div>
  );
}
