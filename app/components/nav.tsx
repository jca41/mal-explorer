import { UserCircleIcon } from '@heroicons/react/solid';
import { NavLink, useFetcher } from '@remix-run/react';

import { ClientAuthState } from '~/contracts/auth';

import { useRouteMatch } from './use-route-match';

const NAV_ITEM_COMMON = 'font-semibold text-lg tracking-wide text-white';
const NAV_ITEM = `${NAV_ITEM_COMMON} hover:underline`;
const NAV_ITEM_ACTIVE = `${NAV_ITEM_COMMON} underline pointer-events-none`;

const getClassName = ({ isActive }: { isActive: boolean }) => (isActive ? NAV_ITEM_ACTIVE : NAV_ITEM);

export function Navigation() {
  const fetcher = useFetcher();
  const { signedIn } = useRouteMatch<{ data: ClientAuthState }>('root').data;

  const onAuthAction = () => fetcher.submit(null, { action: signedIn ? '/oauth/sign-out' : '/oauth/authorize', method: 'post' });

  return (
    <nav className="py-4 px-8 flex space-x-4 items-center justify-center bg-blue-500 shadow-md">
      <NavLink className={getClassName} to="/">
        Search
      </NavLink>
      <NavLink className={getClassName} to="/top">
        Top
      </NavLink>
      <NavLink className={getClassName} to="/seasonal">
        Seasonal
      </NavLink>
      {signedIn ? (
        <button
          className="absolute right-2 md:right-8 text-xs border text-white align-middle rounded-md py-1 px-1.5 transition-transform transform hover:scale-110"
          onClick={() => onAuthAction()}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="absolute right-2 md:right-8 text-white w-8 h-8 transition-transform transform hover:scale-110"
          onClick={() => onAuthAction()}
        >
          <UserCircleIcon></UserCircleIcon>
        </button>
      )}
    </nav>
  );
}
