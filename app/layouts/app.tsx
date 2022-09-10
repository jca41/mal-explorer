import { ReactNode } from 'react';

import { Loading } from '~/components/loading';
import { Navigation } from '~/components/nav';
import { ThemeProvider } from '~/components/theme-picker';

type AppLayout = {
  children: ReactNode;
};
export function AppLayout({ children }: AppLayout) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-base-100">
        <Navigation />
        <div className="py-8 px-6 md:py-10 lg:px-0">
          <div className="mx-auto max-w-screen-md">{children}</div>
        </div>
        <Loading />
      </div>
    </ThemeProvider>
  );
}
