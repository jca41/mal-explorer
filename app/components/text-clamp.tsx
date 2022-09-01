import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { ReactElement, useState } from 'react';

const CLAMP_THRESHOLD = 400;
const ICON = 'w-5 h-5';

export function TextClamp({ children, text }: { children: ReactElement; text: string }) {
  const [expanded, setExpanded] = useState(false);

  if (text.length < CLAMP_THRESHOLD) return children;

  return (
    <div className="relative mb-4">
      <div
        className={clsx({
          'line-clamp-5': !expanded,
          'line-clamp-none': expanded,
        })}
      >
        {children}
      </div>
      <div className="absolute -bottom-10 inset-x-0 flex justify-center">
        <button
          onClick={() => {
            setExpanded((e) => !e);
          }}
          className={clsx('btn btn-sm btn-circle swap swap-rotate z-10', { 'swap-active': expanded })}
        >
          <div className="swap-on">
            <ChevronUpIcon className={ICON} />
          </div>
          <div className="swap-off">
            <ChevronDownIcon className={ICON} />
          </div>
        </button>
      </div>
    </div>
  );
}
