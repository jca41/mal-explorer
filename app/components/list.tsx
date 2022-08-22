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
      <Link to={`/anime/${id}`} className="card glass card-compact card-side shadow-md py-4 px-6 hover:scale-[1.05] transition-transform">
        <figure className=" self-start">
          {main_picture?.medium ? (
            <img className="w-28 md:w-32" src={main_picture?.medium} alt={title} />
          ) : (
            <div className="w-28 md:w-32 bg-base-200"></div>
          )}
        </figure>

        <div className="card-body">
          <h2 className="text-base font-semibold tracking-wide leading-snug mb-5">
            <div>
              {title}
              {start_season?.year && <span className="font-normal">{` (${start_season?.year})`}</span>}
            </div>
            {shouldShowAltTitle({ title, alt: alternative_titles.en }) && <div className="text-sm text-base-content/60">{alternative_titles.en}</div>}
          </h2>

          <ul className="grid grid-cols-2 grid-flow-row gap-x-4 gap-y-2">
            <StatIconPair value={mean} icon={StarIcon} iconClassname="text-primary" textClassName="font-semibold" />
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
