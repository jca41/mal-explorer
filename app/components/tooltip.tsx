import { ReactNode } from 'react';

export function Tooltip({ children, text }: { text: string; children: ReactNode }) {
  return (
    <div className="tooltip" data-tip={text}>
      {children}
    </div>
  );
}
