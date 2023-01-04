import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';
import { MenuIcon, SearchIcon } from '@heroicons/react/solid';
import { NavLink, useFetcher } from '@remix-run/react';
import { twMerge } from 'tailwind-merge';

import { NAV_IMG_SRC } from '~/constants';
import { ClientAuthState } from '~/contracts/auth';

import { ThemePicker } from './theme-picker';
import { useRouteMatch } from './use-route-match';

const CL = {
  menuItemIcon: 'w-5',
};

const getNavItemClassName = ({ isActive }: { isActive: boolean }) => twMerge('font-medium whitespace-nowrap', isActive && 'active');

function AppLinks({ signedIn }: ClientAuthState) {
  return (
    <>
      <li>
        <NavLink className={getNavItemClassName} to="/top">
          Top
        </NavLink>
      </li>
      <li>
        <NavLink className={getNavItemClassName} to="/seasonal">
          Seasonal
        </NavLink>
      </li>
      {signedIn && (
        <li>
          <NavLink className={getNavItemClassName} to="/my-list">
            My List
          </NavLink>
        </li>
      )}
      {signedIn && (
        <li>
          <NavLink className={getNavItemClassName} to="/suggestions">
            Suggestions
          </NavLink>
        </li>
      )}
    </>
  );
}

function AppMenu({ signedIn }: ClientAuthState) {
  const fetcher = useFetcher();

  const onAuthAction = () => fetcher.submit(null, { action: signedIn ? '/oauth/sign-out' : '/oauth/authorize', method: 'post' });

  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm">
        <MenuIcon className="w-5" />
      </label>
      <ul tabIndex={0} className="dropdown-content menu rounded-box menu-compact mt-3 space-y-1.5 bg-base-300 p-2 shadow">
        <li className="menu-title">
          <span>Menu</span>
        </li>
        <AppLinks signedIn={signedIn} />
        <li>
          <button className=" whitespace-nowrap" onClick={onAuthAction}>
            {signedIn ? 'Sign Out' : 'Sign In'}
            {signedIn ? <LogoutIcon className={CL.menuItemIcon} /> : <LoginIcon className={CL.menuItemIcon} />}
          </button>
        </li>
      </ul>
    </div>
  );
}

export function Navigation() {
  const { data: { signedIn } = {} } = useRouteMatch<{ data: ClientAuthState }>('root');

  return (
    <nav className="bg-base-300">
      <div className="navbar mx-auto min-h-min max-w-screen-lg">
        <div className="navbar-start flex items-center">
          <img src={NAV_IMG_SRC} className="mr-3 w-7" />
          <div className="font-mono text-xl font-bold tracking-tight">MAL EXPLORER</div>
        </div>
        <div className="navbar-end space-x-1">
          <NavLink to="/" className={({ isActive }) => twMerge('btn btn-ghost btn-circle btn-sm', isActive && 'btn-active')}>
            <SearchIcon className="w-5" />
          </NavLink>
          <ThemePicker />
          <AppMenu signedIn={!!signedIn} />
        </div>
      </div>
    </nav>
  );
}
