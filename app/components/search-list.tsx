import { CalendarIcon, FilmIcon, StarIcon, TrendingUpIcon, UsersIcon } from '@heroicons/react/solid';
import { ReactNode } from 'react';

import { Node } from '~/contracts/mal';
import { formatMediaType, formatRank, formatStatus } from '~/utils/format-data';

import { StatPair } from './stat-pair';

export function SearchListItem({ title, main_picture, mean, rank, popularity, start_season, status, media_type }: Node) {
  return (
    <li className="rounded-md bg-blue-50 py-4 px-6 max-w-lg w-full shadow-sm grid grid-cols-image-content gap-4">
      <div className="w-28 md:w-32">
        <img src={main_picture.medium} alt={title} />
      </div>

      <div className="">
        <h2 className="text-md tracking-wide mb-5">
          {title} <span className="">({start_season.year})</span>
        </h2>
        <div className="grid grid-cols-2 grid-flow-row gap-4">
          <StatPair value={formatMediaType(media_type)} icon={FilmIcon} />
          <StatPair value={mean} icon={StarIcon} />
          <StatPair value={formatStatus(status)} icon={CalendarIcon} />
          <StatPair value={formatRank(rank)} icon={TrendingUpIcon} />
          <StatPair value={formatRank(popularity)} icon={UsersIcon} />
        </div>
      </div>
    </li>
  );
}

export function SearchList({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col space-y-4 items-center">{children}</ul>;
}
