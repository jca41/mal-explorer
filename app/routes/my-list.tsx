import { LoaderArgs, redirect } from '@remix-run/node';
import { NavLink, Outlet } from '@remix-run/react';
import clsx from 'clsx';
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

const getClassName = ({ isActive }: { isActive: boolean }) => twMerge(clsx('btn btn-outline btn-sm md:btn-md', { 'btn-active': isActive }));

export default function MyListHeader() {
  return (
    <div>
      <h1 className="text-center text-3xl tracking-wide mb-8 md:mb-12">My List</h1>
      <div className="flex justify-start md:justify-center btn-group flex-nowrap overflow-x-auto overflow-y-hidden">
        {LIST_STATUS.map((s) => (
          <NavLink key={s} className={getClassName} to={s}>
            {formatSnakeCase(s)}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}