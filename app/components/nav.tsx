import { NavLink } from '@remix-run/react';

const NAV_ITEM_COMMON = 'font-semibold text-lg tracking-wide text-white';
const NAV_ITEM = `${NAV_ITEM_COMMON} hover:underline`;
const NAV_ITEM_ACTIVE = `${NAV_ITEM_COMMON} underline`;

const renderNavItem =
  (title: string) =>
  ({ isActive }: { isActive: boolean }) => {
    return <span className={isActive ? NAV_ITEM_ACTIVE : NAV_ITEM}>{title}</span>;
  };

export function Navigation() {
  return (
    <nav className="py-4 px-8 flex space-x-4 items-center justify-center bg-blue-500 shadow-md">
      <NavLink to="/">{renderNavItem('Home')}</NavLink>
      <NavLink to="/top">{renderNavItem('Top')}</NavLink>
      <NavLink to="/seasonal">{renderNavItem('Seasonal')}</NavLink>
    </nav>
  );
}
