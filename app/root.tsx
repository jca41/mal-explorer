import { ErrorBoundaryComponent, LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
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

export const loader: LoaderFunction = async ({ request }) => {
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
      <div className=" max-w-lg my-4 rounded-md bg-red-300 bg-opacity-40 p-4 mx-auto shadow-lg">
        <h1 className="font-bold text-red-700 text-3xl text-center mb-6">{error.name}</h1>
        <div className="space-y-4">
          <code className="text-lg">{error.message}</code>
          <code className="text-xs text-slate-600 block">{error.stack}</code>
        </div>
      </div>
    </RootLayout>
  );
};

export function CatchBoundary() {
  const { status } = useCatch();

  return <RootLayout>{status === 404 && <h1 className="text-3xl text-center font-semibold tracking-wide">Page Not Found</h1>}</RootLayout>;
}
