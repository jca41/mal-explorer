import { ClipboardListIcon, FilmIcon, FolderIcon, StarIcon, TrendingUpIcon, UsersIcon } from '@heroicons/react/solid';
import { Link } from '@remix-run/react';
import { ReactNode } from 'react';

import { Node } from '~/contracts/mal';
import { shouldShowAltTitle } from '~/utils/check-data';
import { formatMediaType, formatNumEpisodes, formatRank, formatStatus } from '~/utils/format-data';

import { StatIconPair } from './stat-pair';

export function ListItem({
  id,
  title,
  main_picture,
  alternative_titles,
  mean,
  rank,
  popularity,
  start_season,
  status,
  media_type,
  num_episodes,
}: Node) {
  return (
    <li className="max-w-lg w-full animate-fadeIn">
      <Link
        to={`/anime/${id}`}
        className="rounded-md bg-blue-50 py-4 px-6 shadow-sm grid grid-cols-image-content gap-4 hover:scale-[1.05] transition-transform"
      >
        <div className="w-28 md:w-32">
          {main_picture?.medium ? <img src={main_picture?.medium} alt={title} /> : <div className="bg-blue-100 w-full h-full"></div>}
        </div>

        <div className="">
          <h2 className="text-md font-semibold tracking-wide leading-snug mb-5">
            <div>
              {title}
              {start_season?.year && <span className="font-normal">{` (${start_season?.year})`}</span>}
            </div>
            {shouldShowAltTitle({ title, alt: alternative_titles.en }) && <div className="text-slate-500 text-sm">{alternative_titles.en}</div>}
          </h2>

          <ul className="grid grid-cols-2 grid-flow-row gap-x-4 gap-y-2">
            <StatIconPair value={mean} icon={StarIcon} iconClassname="text-yellow-500" textClassName="font-semibold" />
            <StatIconPair value={formatMediaType(media_type)} icon={FilmIcon} />
            <StatIconPair value={formatStatus(status)} icon={ClipboardListIcon} />
            <StatIconPair value={formatRank(rank)} icon={TrendingUpIcon} />
            <StatIconPair value={formatNumEpisodes(num_episodes)} icon={FolderIcon} />
            <StatIconPair value={formatRank(popularity)} icon={UsersIcon} />
          </ul>
        </div>
      </Link>
    </li>
  );
}

export function List({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col space-y-4 items-center">{children}</ul>;
}
