import { ReactNode } from 'react';

type AppLayout = {
  children: ReactNode;
};
export function AppLayout({ children }: AppLayout) {
  return (
    <div className="py-10 px-8 lg:px-0 bg-blue-100 min-h-screen text-slate-700">
      <div className="max-w-screen-md mx-auto">{children}</div>
    </div>
  );
}
