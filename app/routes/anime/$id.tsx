import { ClipboardListIcon, FilmIcon, FolderIcon, StarIcon, TrendingUpIcon, UsersIcon } from '@heroicons/react/solid';
import { LoaderArgs } from '@remix-run/node';
import { Outlet, ShouldReloadFunction, useLoaderData } from '@remix-run/react';
import { useMemo } from 'react';

import { GridPreview, GridPreviewItem } from '~/components/grid-preview';
import { ImageGallery, VideoGallery } from '~/components/media-galery';
import { MyListStatusPopup } from '~/components/my-list-status/popup';
import { RelatedGrid } from '~/components/related-grid';
import { StatBadge, StatIconBadge } from '~/components/stat-badge';
import { TextClamp } from '~/components/text-clamp';
import malService from '~/lib/mal/api/service.server';
import { getAccessToken } from '~/lib/session.server';
import { shouldShowAltTitle } from '~/utils/check-data';
import {
  formatEpisodeDuration,
  formatMediaType,
  formatNumEpisodes,
  formatPopularity,
  formatRank,
  formatStartAndEndDate,
  formatStatus,
} from '~/utils/format-data';
import { formatSnakeCase } from '~/utils/primitives';
import { ParsedIntSchema } from '~/utils/zod';

export const unstable_shouldReload: ShouldReloadFunction = ({ submission, url, prevUrl }) => {
  return !!submission || !prevUrl.pathname.includes(url.pathname);
};

export async function loader({ params, request }: LoaderArgs) {
  const id = ParsedIntSchema.parse(params.id);

  const accessToken = await getAccessToken(request);

  return malService.query.animeDetail({
    id,
    accessToken,
  });
}

const STAT_BASE = 'md:badge-lg badge-outline';
const SUBTITLE = 'text-2xl tracking-wide font-bold mb-6';
const PROSE = 'text-base-content/90 max-w-none';

export default function AnimeDetails() {
  const data = useLoaderData<typeof loader>();

  const {
    id,
    title,
    alternative_titles,
    start_season,
    mean,
    media_type,
    rank,
    popularity,
    num_list_users,
    status,
    main_picture,
    synopsis,
    background,
    num_episodes,
    genres,
    studios,
    source,
    related_anime,
    recommendations,
    videos,
    pictures,
    start_date,
    end_date,
    rating,
    average_episode_duration,
    my_list_status,
  } = data;

  const infoData = useMemo(() => {
    return [
      ['Studios', studios?.map((s) => s.name).join(', ')],
      ['Source', formatSnakeCase(source)],
      ['Average ep. duration', formatEpisodeDuration(average_episode_duration)],
      ['Start date', formatStartAndEndDate(start_date)],
      ['End date', formatStartAndEndDate(end_date)],
      ['Rating', formatSnakeCase(rating)?.toUpperCase?.()],
    ];
  }, [data]);

  return (
    <div className="relative">
      <h1 className="text-center text-2xl tracking-wide">
        <div>
          <span className="font-bold">{title}</span>
          {!!start_season?.year && <span className="font-normal">{` (${start_season.year})`}</span>}
        </div>
        {shouldShowAltTitle({ title, alt: alternative_titles.en }) && (
          <div className="text-xl font-semibold text-base-content/60">{alternative_titles.en}</div>
        )}
      </h1>
      <div className="mt-12 flex flex-col space-y-10">
        <section className="flex flex-col space-y-5">
          <ul className="flex flex-wrap justify-center gap-x-3 gap-y-2">
            <StatIconBadge value={mean} icon={StarIcon} classname={STAT_BASE} iconClassname={`text-primary`} />
            <StatIconBadge value={formatRank(rank)} icon={TrendingUpIcon} classname={STAT_BASE} />
            <StatIconBadge value={formatPopularity(num_list_users, popularity)} classname={STAT_BASE} icon={UsersIcon} />
            <StatIconBadge value={formatMediaType(media_type)} icon={FilmIcon} classname={STAT_BASE} />
            <StatIconBadge value={formatStatus(status)} icon={ClipboardListIcon} classname={STAT_BASE} />
            <StatIconBadge value={formatNumEpisodes(num_episodes)} icon={FolderIcon} classname={STAT_BASE} />
          </ul>
          {genres?.length && (
            <ul className="flex flex-wrap justify-center gap-y-2 gap-x-2">
              {genres.map(({ name, id }) => (
                <StatBadge key={id} value={name} classname={'badge-sm md:badge-md badge-ghost'} />
              ))}
            </ul>
          )}
        </section>
        {main_picture?.large && (
          <div className="flex justify-center">
            <img src={main_picture.large} alt={title} className="max-w-[70%] sm:max-w-xs" />
          </div>
        )}
        {synopsis && (
          <section>
            <h2 className={SUBTITLE}>Synopsis</h2>
            <TextClamp text={synopsis}>{<p className={`prose ${PROSE}`}>{synopsis}</p>}</TextClamp>
          </section>
        )}
        <section>
          <h2 className={SUBTITLE}>Info</h2>
          <table className="table-zebra table-compact table w-full">
            <tbody className="">
              {infoData.map(([key, value]) =>
                value ? (
                  <tr>
                    <th>{key}</th>
                    <td>{value}</td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </section>
        {!!related_anime?.length && (
          <section>
            <h2 className={SUBTITLE}>Related</h2>
            <RelatedGrid key={id} items={related_anime} />
          </section>
        )}
        {background && (
          <section>
            <h2 className={SUBTITLE}>Background</h2>
            <TextClamp text={background}>{<p className={`prose-lg ${PROSE}`}>{background}</p>}</TextClamp>
          </section>
        )}
        {!!videos.length && (
          <section>
            <h2 className={SUBTITLE}>Videos</h2>
            <VideoGallery key={id} videos={videos} />
          </section>
        )}
        {!!recommendations?.length && (
          <section>
            <h2 className={SUBTITLE}>Recommendations</h2>
            <GridPreview>
              {recommendations.map((r) => (
                <GridPreviewItem key={r.node.id} {...r} />
              ))}
            </GridPreview>
          </section>
        )}
        {!!pictures.length && (
          <section>
            <h2 className={SUBTITLE}>Images</h2>
            <div className="">
              <ImageGallery pictures={pictures} />
            </div>
          </section>
        )}
      </div>
      <MyListStatusPopup myListStatus={my_list_status} numEpisodes={num_episodes} />
      <Outlet />
    </div>
  );
}
