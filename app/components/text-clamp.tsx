import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { ReactNode, useState } from 'react';

const CLAMP_THRESHOLD = 400;
const ICON = 'w-5 h-5';

export function TextClamp({ children, text }: { children: ReactNode; text: string }) {
  const [expanded, setExpanded] = useState(false);

  const clampClasses = !expanded ? 'line-clamp-5' : 'line-clamp-none';

  return (
    <div className="relative">
      <div className={clampClasses}>{children}</div>
      {text.length >= CLAMP_THRESHOLD && (
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
      )}
    </div>
  );
}
