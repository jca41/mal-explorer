import { UserCircleIcon } from '@heroicons/react/solid';
import { NavLink, useFetcher } from '@remix-run/react';

const NAV_ITEM_COMMON = 'font-semibold text-lg tracking-wide text-white';
const NAV_ITEM = `${NAV_ITEM_COMMON} hover:underline`;
const NAV_ITEM_ACTIVE = `${NAV_ITEM_COMMON} underline pointer-events-none`;

const getClassName = ({ isActive }: { isActive: boolean }) => (isActive ? NAV_ITEM_ACTIVE : NAV_ITEM);

export function Navigation() {
  const fetcher = useFetcher();

  const signIn = () => fetcher.submit(null, { action: '/oauth/authorize', method: 'post' });

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
      <button className="absolute right-8 text-white w-8 h-8 transition-transform transform hover:scale-110" onClick={() => signIn()}>
        <UserCircleIcon></UserCircleIcon>
      </button>
    </nav>
  );
}
