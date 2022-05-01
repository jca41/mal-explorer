import { ReactNode } from 'react';

type AppLayout = {
  children: ReactNode;
};
export function AppLayout({ children }: AppLayout) {
  return (
    <div className="py-10 px-4 bg-blue-100 min-h-screen text-slate-800">
      <div className="max-w-screen-md mx-auto">{children}</div>
    </div>
  );
}
