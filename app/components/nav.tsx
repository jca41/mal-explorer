import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';
import { MenuIcon } from '@heroicons/react/solid';
import { NavLink, useFetcher } from '@remix-run/react';
import { twMerge } from 'tailwind-merge';

import { NAV_IMG_SRC } from '~/constants';
import { ClientAuthState } from '~/contracts/auth';

import { ThemePicker } from './theme-picker';
import { useRouteMatch } from './use-route-match';

const CL = {
  menuItemIcon: 'w-5',
};

function AppMenu({ signedIn }: ClientAuthState) {
  const fetcher = useFetcher();

  const onAuthAction = () => fetcher.submit(null, { action: signedIn ? '/oauth/sign-out' : '/oauth/authorize', method: 'post' });

  return (
    <div className="dropdown dropdown-left">
      <label tabIndex={0} className="btn btn-circle btn-sm ml-1">
        <MenuIcon className="w-4" />
      </label>
      <ul tabIndex={0} className="dropdown-content menu menu-compact bg-base-100 p-2 shadow-md rounded-box">
        <li>
          <button className=" whitespace-nowrap" onClick={onAuthAction}>
            {signedIn ? <LogoutIcon className={CL.menuItemIcon} /> : <LoginIcon className={CL.menuItemIcon} />}
            {signedIn ? 'Sign Out' : 'Sign In'}
          </button>
        </li>
      </ul>
    </div>
  );
}

const getNavItemClassName = ({ isActive }: { isActive: boolean }) => twMerge('font-medium whitespace-nowrap', isActive && 'active');

export function Navigation() {
  const { signedIn } = useRouteMatch<{ data: ClientAuthState }>('root').data;

  return (
    <nav className="bg-base-300">
      <div className="navbar min-h-min">
        <div className="navbar-start flex items-center">
          <img src={NAV_IMG_SRC} className="w-7 mr-3" />
          <div className="text-xl font-bold tracking-tight font-mono">MAL EXPLORER</div>
        </div>
        <div className="navbar-end space-x-1">
          <ThemePicker />
          <AppMenu signedIn={signedIn} />
        </div>
      </div>
      <div className="navbar min-h-min pt-0">
        <div className="navbar-start"></div>
        <ul className="menu menu-compact menu-horizontal">
          <li>
            <NavLink className={getNavItemClassName} to="/">
              Search
            </NavLink>
          </li>

          {signedIn && (
            <li>
              <NavLink className={getNavItemClassName} to="/my-list">
                My List
              </NavLink>
            </li>
          )}
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
        </ul>
        <div className="navbar-end"></div>
      </div>
    </nav>
  );
}
