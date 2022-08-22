import { ReactNode } from 'react';

import { LoadingIndication } from '~/components/loading';
import { Navigation } from '~/components/nav';

type AppLayout = {
  children: ReactNode;
};
export function AppLayout({ children }: AppLayout) {
  return (
    <div className="min-h-screen bg-base-100">
      <Navigation />
      <div className="py-8 md:py-10 px-6 lg:px-0">
        <div className="max-w-screen-md mx-auto">{children}</div>
      </div>
      <LoadingIndication />
    </div>
  );
}
