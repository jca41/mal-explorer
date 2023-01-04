import { ErrorBoundaryComponent, LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from '@remix-run/react';
import { FC, PropsWithChildren } from 'react';

import { AppLayout } from '~/layouts/app';
import styles from '~/styles/app.css';

import { LOADING_IMG_SRC, NAV_IMG_SRC } from './constants';
import { ClientAuthState } from './contracts/auth';
import { ThemeClientState } from './contracts/theme';
import { getAccessToken } from './lib/session.server';
import { getThemeCookie } from './lib/theme-cookie.server';

const PRELOADED_IMAGES = [NAV_IMG_SRC, LOADING_IMG_SRC];

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }, ...PRELOADED_IMAGES.map((href) => ({ rel: 'preload', as: 'image', href }))];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'MAL Explorer',
  viewport: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no',
});

export const loader = async ({ request }: LoaderArgs) => {
  const accessToken = await getAccessToken(request);

  const theme = await getThemeCookie(request);

  const rootData: ClientAuthState & ThemeClientState = {
    theme,
    signedIn: !!accessToken,
  };

  return rootData;
};

const RootLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <AppLayout>{children}</AppLayout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <RootLayout>
      <div className=" my-4 mx-auto max-w-screen-lg rounded-md bg-error bg-opacity-40 p-4 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-error">{error.name}</h1>
        <div className="space-y-4">
          <code className="text-lg">{error.message}</code>
          <code className="block whitespace-pre-wrap text-xs text-error-content">{error.stack}</code>
        </div>
      </div>
    </RootLayout>
  );
};

export function CatchBoundary() {
  const { status } = useCatch();

  return <RootLayout>{status === 404 && <h1 className="text-center text-3xl font-semibold tracking-wide">Page Not Found</h1>}</RootLayout>;
}
