import { ClipboardListIcon, FilmIcon, FolderIcon, StarIcon, TrendingUpIcon, UsersIcon } from '@heroicons/react/solid';
import { Link } from '@remix-run/react';
import clsx from 'clsx';
import { ReactNode } from 'react';

import { Node } from '~/contracts/mal';
import { shouldShowAltTitle } from '~/utils/check-data';
import { formatMediaType, formatNumEpisodes, formatRank, formatStatus } from '~/utils/format-data';

import { StatIconBadge } from './stat-badge';

const STAT_BASE = 'badge-ghost';
const IMG_DIMENSIONS = 'w-[35%] sm:w-[30%]';

type ListItemProps = Node & { children?: ReactNode };

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
  children = null,
}: ListItemProps) {
  return (
    <li className="max-w-lg w-full animate-fadeIn">
      <Link to={`/anime/${id}`} className="card glass card-compact card-side shadow-md transition-transform hover:scale-[1.05]">
        {main_picture?.medium ? (
          <img className={clsx(IMG_DIMENSIONS, 'object-cover')} src={main_picture?.medium} alt={title} />
        ) : (
          <div className={clsx(IMG_DIMENSIONS)}></div>
        )}

        <div className="card-body">
          <h2 className="text-base font-semibold tracking-wide leading-snug mb-5">
            <div>
              {title}
              {start_season?.year && <span className="font-normal">{` (${start_season?.year})`}</span>}
            </div>
            {shouldShowAltTitle({ title, alt: alternative_titles.en }) && <div className="text-sm text-base-content/60">{alternative_titles.en}</div>}
          </h2>

          <ul className="flex flex-row flex-wrap gap-x-4 gap-y-3">
            <StatIconBadge value={mean} icon={StarIcon} iconClassname="text-primary" textClassName="font-semibold" classname={STAT_BASE} />
            <StatIconBadge value={formatMediaType(media_type)} icon={FilmIcon} classname={STAT_BASE} />
            <StatIconBadge value={formatStatus(status)} icon={ClipboardListIcon} classname={STAT_BASE} />
            <StatIconBadge value={formatRank(rank)} icon={TrendingUpIcon} classname={STAT_BASE} />
            <StatIconBadge value={formatRank(popularity)} icon={UsersIcon} classname={STAT_BASE} />
            <StatIconBadge value={formatNumEpisodes(num_episodes)} icon={FolderIcon} classname={STAT_BASE} />
          </ul>
          {children}
        </div>
      </Link>
    </li>
  );
}

export function List({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col space-y-4 items-center">{children}</ul>;
}
