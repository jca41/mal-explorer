import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { ReactElement, useState } from 'react';

const CLAMP_THRESHOLD = 400;
const ICON = 'w-5 h-5';

export function TextClamp({ children, text }: { children: ReactElement; text: string }) {
  const [expanded, setExpanded] = useState(false);

  if (text.length < CLAMP_THRESHOLD) return children;

  return (
    <div className="relative mb-4">
      <div className={!expanded ? 'line-clamp-5' : 'line-clamp-none'}>{children}</div>
      <div className="absolute -bottom-8 inset-x-0 flex justify-center">
        <button
          onClick={() => {
            setExpanded((e) => !e);
          }}
          className="z-10 rounded-full p-1 bg-slate-100 shadow-lg"
        >
          {expanded ? <ChevronUpIcon className={ICON} /> : <ChevronDownIcon className={ICON} />}
        </button>
      </div>
    </div>
  );
}
