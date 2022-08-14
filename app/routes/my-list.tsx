import { LoaderArgs, redirect } from '@remix-run/node';
import { NavLink, Outlet } from '@remix-run/react';
import { twMerge } from 'tailwind-merge';

import { MyListStatus } from '~/contracts/mal';
import { formatSnakeCase } from '~/utils/string';

export async function loader({ params }: LoaderArgs) {
  if (!params.status) {
    return redirect('/my-list/watching', { status: 301 });
  }

  return {};
}
const LIST_STATUS: MyListStatus['status'][] = ['watching', 'plan_to_watch', 'on_hold', 'dropped', 'completed'];

const getClassName = ({ isActive }: { isActive: boolean }) =>
  twMerge(
    'text-md font-medium bg-slate-100 rounded-full shadow-md py-2 px-5 transition-colors duration-300 whitespace-nowrap',
    isActive && 'bg-blue-400 text-white'
  );

export default function MyListHeader() {
  return (
    <div>
      <h1 className="text-center text-3xl tracking-wide mb-4 md:mb-8">My List</h1>
      <ul className="flex space-x-4 items-center overflow-x-auto pt-2 pb-4">
        {LIST_STATUS.map((s) => (
          <li key={s}>
            <NavLink className={getClassName} to={s}>
              {formatSnakeCase(s)}
            </NavLink>
          </li>
        ))}
      </ul>

      <Outlet />
    </div>
  );
}
