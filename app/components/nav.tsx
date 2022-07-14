import { Menu, Transition } from '@headlessui/react';
import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';
import { MenuIcon, UserCircleIcon } from '@heroicons/react/solid';
import { NavLink, useFetcher } from '@remix-run/react';
import { Fragment, ReactNode } from 'react';

import { ClientAuthState } from '~/contracts/auth';

import { useRouteMatch } from './use-route-match';

const NAV_ITEM_COMMON = 'font-semibold text-base tracking-wide text-white decoration-dotted decoration-2';
const CL = {
  navItemCommon: NAV_ITEM_COMMON,
  navItem: `${NAV_ITEM_COMMON} hover:underline`,
  navItemActive: `${NAV_ITEM_COMMON} underline pointer-events-none`,
  menuIcon: 'h-7 w-7 text-white transition-transform transform hover:scale-110',
  menuItemIcon: 'mr-2 h-5 w-5',
};

function AppMenuItem({ children }: { children: ReactNode }) {
  return (
    <Menu.Item>
      {({ active }) => <div className={`${active ? 'bg-blue-500 text-white' : 'text-slate-700'} w-full rounded-md text-sm`}>{children}</div>}
    </Menu.Item>
  );
}
function AppMenu() {
  const fetcher = useFetcher();
  const { signedIn } = useRouteMatch<{ data: ClientAuthState }>('root').data;

  const onAuthAction = () => fetcher.submit(null, { action: signedIn ? '/oauth/sign-out' : '/oauth/authorize', method: 'post' });

  return (
    <Menu as="div" className="absolute right-2 top-0">
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

const getClassName = ({ isActive }: { isActive: boolean }) => (isActive ? CL.navItemActive : CL.navItem);

export function Navigation() {
  return (
    <nav className="py-4 px-8 flex-row space-y-3 bg-gradient-to-b from-blue-800  to-blue-400 shadow-md">
      <div className="relative flex items-center justify-center">
        <div className=" text-xl font-bold font-mono text-slate-100">MAL EXPLORER</div>
        <AppMenu />
      </div>
      <div className="flex space-x-4 items-center justify-center overflow-x-auto">
        <NavLink className={getClassName} to="/">
          Search
        </NavLink>
        <NavLink className={getClassName} to="/top">
          Top
        </NavLink>
        <NavLink className={getClassName} to="/seasonal">
          Seasonal
        </NavLink>
      </div>
    </nav>
  );
}
