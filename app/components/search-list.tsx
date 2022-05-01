import { ClipboardListIcon, FilmIcon, StarIcon, TrendingUpIcon, UsersIcon } from '@heroicons/react/solid';
import { Link } from '@remix-run/react';
import { ReactNode } from 'react';

import { Node } from '~/contracts/mal';
import { formatMediaType, formatRank, formatStatus } from '~/utils/format-data';

import { StatPair } from './stat-pair';

export function SearchListItem({ id, title, main_picture, alternative_titles, mean, rank, popularity, start_season, status, media_type }: Node) {
  return (
    <li className="max-w-lg w-full">
      <Link
        to={`anime/${id}`}
        className="rounded-md bg-blue-50 py-4 px-6 shadow-sm grid grid-cols-image-content gap-4 hover:scale-[1.05] transition-transform"
      >
        <div className="w-28 md:w-32">
          <img src={main_picture.medium} alt={title} />
        </div>

        <div className="">
          <h2 className="text-md font-semibold tracking-wide leading-snug mb-5">
            <div>
              {title}
              {start_season?.year && <span className="font-normal">{` (${start_season?.year})`}</span>}
            </div>
            {alternative_titles.en && <div className="text-slate-500 text-sm">{alternative_titles.en}</div>}
          </h2>

          <div className="grid grid-cols-2 grid-flow-row gap-x-4 gap-y-2">
            <StatPair value={mean} icon={StarIcon} iconClassname="text-yellow-500" textClassName="font-semibold" />
            <StatPair value={formatMediaType(media_type)} icon={FilmIcon} />
            <StatPair value={formatStatus(status)} icon={ClipboardListIcon} />
            <StatPair value={formatRank(rank)} icon={TrendingUpIcon} />
            <StatPair value={formatRank(popularity)} icon={UsersIcon} />
          </div>
        </div>
      </Link>
    </li>
  );
}

export function SearchList({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col space-y-4 items-center">{children}</ul>;
}
