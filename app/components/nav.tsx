import { Menu, Transition } from '@headlessui/react';
import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';
import { MenuIcon, UserCircleIcon } from '@heroicons/react/solid';
import { NavLink, useFetcher } from '@remix-run/react';
import { Fragment, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { NAV_IMG_SRC } from '~/constants';
import { ClientAuthState } from '~/contracts/auth';

import { ThemePicker } from './theme-picker';
import { useRouteMatch } from './use-route-match';

const CL = {
  menuIcon: 'h-7 w-7 text-primary-content transition-transform transform hover:scale-110',
  menuItemIcon: 'mr-2 h-5 w-5',
};

function AppMenuItem({ children }: { children: ReactNode }) {
  return (
    <Menu.Item>
      {({ active }) => <div className={`${active ? 'bg-blue-500 text-white' : 'text-slate-700'} w-full rounded-md text-sm`}>{children}</div>}
    </Menu.Item>
  );
}
function AppMenu({ signedIn }: ClientAuthState) {
  const fetcher = useFetcher();

  const onAuthAction = () => fetcher.submit(null, { action: signedIn ? '/oauth/sign-out' : '/oauth/authorize', method: 'post' });

  return (
    <Menu as="div" className="navbar-end">
      <Menu.Button className="flex items-center">
        {signedIn ? <UserCircleIcon className={CL.menuIcon} /> : <MenuIcon className={CL.menuIcon} />}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <AppMenuItem>
              <button className="flex w-full p-2" onClick={onAuthAction}>
                {signedIn ? <LogoutIcon className={CL.menuItemIcon} /> : <LoginIcon className={CL.menuItemIcon} />}
                {signedIn ? 'Sign Out' : 'Sign In'}
              </button>
            </AppMenuItem>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const getClassName = ({ isActive }: { isActive: boolean }) => twMerge('text-primary-content', isActive && 'text-secondary-content bg-secondary');

export function Navigation() {
  const { signedIn } = useRouteMatch<{ data: ClientAuthState }>('root').data;

  return (
    <nav className="bg-primary">
      <div className="navbar min-h-min">
        <div className="navbar-start">
          <img src={NAV_IMG_SRC} className="w-7 mr-3" />
          <div className="text-xl font-bold tracking-tight font-mono text-primary-content bg-clip-text drop-shadow-lg">MAL EXPLORER</div>
        </div>
        <AppMenu signedIn={signedIn} />
      </div>
      <div className="navbar min-h-min pt-0">
        <div className="navbar-start"></div>
        <ul className="menu menu-compact menu-horizontal">
          <li>
            <NavLink className={getClassName} to="/">
              Search
            </NavLink>
          </li>

          {signedIn && (
            <li>
              <NavLink className={getClassName} to="/my-list">
                My List
              </NavLink>
            </li>
          )}
          <li>
            <NavLink className={getClassName} to="/top">
              Top
            </NavLink>
          </li>
          <li>
            <NavLink className={getClassName} to="/seasonal">
              Seasonal
            </NavLink>
          </li>
        </ul>
        <div className="navbar-end"></div>
      </div>
    </nav>
  );
}
