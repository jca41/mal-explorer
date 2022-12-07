import { ReactNode } from 'react';

export function Tooltip({ children, text, as: As = 'div' }: { text: string; children: ReactNode; as?: 'div' | 'li' }) {
  return (
    <As className="tooltip" data-tip={text}>
      {children}
    </As>
  );
}
