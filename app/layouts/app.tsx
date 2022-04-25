import { ReactNode } from 'react';

type AppLayout = {
  children: ReactNode;
};
export function AppLayout({ children }: AppLayout) {
  return (
    <div className="py-10 px-4">
      <div className="max-w-screen-lg mx-auto">{children}</div>
    </div>
  );
}
