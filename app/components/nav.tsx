import { NavLink } from '@remix-run/react';

const NAV_ITEM_COMMON = 'font-semibold text-lg tracking-wide text-white';
const NAV_ITEM = `${NAV_ITEM_COMMON} hover:underline`;
const NAV_ITEM_ACTIVE = `${NAV_ITEM_COMMON} underline pointer-events-none`;

const getClassName = ({ isActive }: { isActive: boolean }) => (isActive ? NAV_ITEM_ACTIVE : NAV_ITEM);

export function Navigation() {
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
    </nav>
  );
}
