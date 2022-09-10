import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { ReactElement, useState } from 'react';

const CLAMP_THRESHOLD = 400;
const ICON = 'w-5';

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
      <div className="absolute inset-x-0 -bottom-10 flex justify-center">
        <button
          onClick={() => {
            setExpanded((e) => !e);
          }}
          className={clsx('btn swap btn-circle btn-sm swap-rotate z-10', { 'swap-active': expanded })}
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
