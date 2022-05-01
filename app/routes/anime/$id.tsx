import { ClipboardListIcon, FilmIcon, StarIcon, TrendingUpIcon, UsersIcon } from '@heroicons/react/solid';
import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { StatPair } from '~/components/stat-pair';
import { Node } from '~/contracts/mal';
import { malService } from '~/lib/mal-service.server';
import { bleach } from '~/MOCKS/details';
import { formatMediaType, formatRank, formatStatus } from '~/utils/format-data';
export const loader: LoaderFunction = async ({ params }) => {
  invariant(typeof params.id === 'string');

  return malService({
    type: 'detail',
    params: {
      id: params.id,
    },
  });
};

const STAT_ICON_CLASS = 'w-5';
const STAT_TEXT_CLASS = 'text-md font-semibold';
const STAT_ROW_CLASS = 'flex space-x-4 gap-y-2 justify-center flex-wrap';

export default function AnimeDetails() {
  const data = useLoaderData<Node>();
  const { title, alternative_titles, start_season, mean, media_type, rank, popularity, status, main_picture, synopsis } = data;

  return (
    <div>
      <h1 className="text-2xl text-center tracking-wide">
        <div>
          <span className="font-bold">{title}</span>
          {!!start_season?.year && <span className="font-normal">{` (${start_season.year})`}</span>}
        </div>
        <div className="text-xl text-slate-500 font-semibold">{alternative_titles.en}</div>
      </h1>
      <div className="mt-10 flex flex-col space-y-8">
        <section className={STAT_ROW_CLASS}>
          <StatPair value={mean} icon={StarIcon} iconClassname={`text-yellow-500 ${STAT_ICON_CLASS}`} textClassName={STAT_TEXT_CLASS} />
          <StatPair value={formatRank(rank)} icon={TrendingUpIcon} iconClassname={STAT_ICON_CLASS} textClassName={STAT_TEXT_CLASS} />
          <StatPair value={formatRank(popularity)} icon={UsersIcon} iconClassname={STAT_ICON_CLASS} textClassName={STAT_TEXT_CLASS} />
          <StatPair value={formatMediaType(media_type)} icon={FilmIcon} iconClassname={STAT_ICON_CLASS} textClassName={STAT_TEXT_CLASS} />
          <StatPair value={formatStatus(status)} icon={ClipboardListIcon} iconClassname={STAT_ICON_CLASS} textClassName={STAT_TEXT_CLASS} />
        </section>
        <div className="flex justify-center">
          <img src={main_picture.large} alt={title} className="max-w-[50%] sm:max-w-xs" />
        </div>
        <section className="prose prose-slate mx-auto">
          <p>{synopsis}</p>
        </section>
      </div>

      <div className="flex flex-col space-y-10 mt-10">{JSON.stringify(bleach)}</div>
    </div>
  );
}
