import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { useState } from 'react';

const CL = {
  icon: 'w-5',
};
export function DeleteFlow() {
  const [requested, setRequested] = useState(false);
  return (
    <div className="flex h-6 justify-between gap-1">
      <button className="btn btn-outline btn-error btn-xs" type="button" onClick={() => setRequested(true)}>
        Delete from my list
      </button>

      {requested ? (
        <div className="flex animate-fade-in-fast items-center">
          <span className="text-center text-sm font-medium">Are you sure?</span>
          <div className="ml-2 flex space-x-1">
            <button className="btn btn-outline btn-xs" type="button" onClick={() => setRequested(false)}>
              <XIcon className={CL.icon} />
            </button>
            <button className="btn btn-outline btn-error btn-xs" type="submit" name="_action" value="delete">
              <CheckIcon className={CL.icon} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
