import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { useState } from 'react';

const CL = {
  icon: 'w-5',
};
export function DeleteFlow() {
  const [requested, setRequested] = useState(false);
  return (
    <div className="flex justify-between h-6">
      <button className="btn btn-outline btn-xs btn-error" type="button" onClick={() => setRequested(true)}>
        Delete from my list
      </button>

      {requested ? (
        <div className="flex items-center animate-fade-in-fast">
          <span className="text-sm font-medium">Are you sure?</span>
          <div className="flex ml-2 space-x-1">
            <button className="btn btn-xs btn-outline" type="button" onClick={() => setRequested(false)}>
              <XIcon className={CL.icon} />
            </button>
            <button className="btn btn-xs btn-error btn-outline" type="submit" name="_action" value="delete">
              <CheckIcon className={CL.icon} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
