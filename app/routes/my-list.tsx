import { LoaderArgs, redirect } from '@remix-run/node';
import { NavLink, Outlet } from '@remix-run/react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Heading } from '~/components/heading';
import { LIST_STATUS } from '~/constants';
import { formatSnakeCase } from '~/utils/primitives';

export async function loader({ params }: LoaderArgs) {
  if (!params.status) {
    return redirect('/my-list/watching', { status: 301 });
  }

  return {};
}

const getClassName = ({ isActive }: { isActive: boolean }) => twMerge(clsx('btn btn-outline btn-sm md:btn-md', { 'btn-active': isActive }));

export default function MyListHeader() {
  return (
    <div>
      <Heading className="mb-8 md:mb-12">My List</Heading>
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
