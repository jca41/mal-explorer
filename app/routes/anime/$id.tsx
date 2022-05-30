import { ClipboardListIcon, FilmIcon, FolderIcon, StarIcon, TrendingUpIcon, UsersIcon } from '@heroicons/react/solid';
import { LinksFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import reactGalleryStyles from 'react-image-gallery/styles/css/image-gallery.css';
import invariant from 'tiny-invariant';

import { GridPreview, GridPreviewItem } from '~/components/grid-preview';
import { ImageGallery, VideoGallery } from '~/components/media-galery';
import { RelatedGrid } from '~/components/related-grid';
import { StatIconPair, StatPair } from '~/components/stat-pair';
import { TextClamp } from '~/components/text-clamp';
import { Node } from '~/contracts/mal';
import { malService } from '~/lib/mal-service.server';
import {
  formatEpisodeDuration,
  formatMediaType,
  formatNumEpisodes,
  formatPopularity,
  formatRank,
  formatSource,
  formatStatus,
} from '~/utils/format-data';
import { formatSnakeCase } from '~/utils/string';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: reactGalleryStyles }];
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(typeof params.id === 'string');

  return malService({
    type: 'detail',
    fields: 'detail',
    params: {
      id: params.id,
    },
  });
};

const STAT_ICON = 'w-5';
const STAT_TEXT = 'text-md tracking-tight';
const SUBTITLE = 'text-xl tracking-wide font-bold mb-6';

export default function AnimeDetails() {
  const data = useLoaderData<Node>();
  const {
    id,
    title,
    alternative_titles,
    start_season,
    mean,
    media_type,
    rank,
    popularity,
    num_scoring_users,
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
  } = data;

  return (
    <div>
      <h1 className="text-2xl text-center tracking-wide">
        <div>
          <span className="font-bold">{title}</span>
          {!!start_season?.year && <span className="font-normal">{` (${start_season.year})`}</span>}
        </div>
        <div className="text-xl text-slate-500 font-semibold">{alternative_titles.en}</div>
      </h1>
      <div className="mt-12 flex flex-col space-y-10">
        <section className="flex flex-col space-y-3">
          <ul className="flex gap-y-1 justify-center flex-wrap space-x-4">
            <StatIconPair value={mean} icon={StarIcon} iconClassname={`text-yellow-500 ${STAT_ICON}`} textClassName={STAT_TEXT} />
            <StatIconPair value={formatRank(rank)} icon={TrendingUpIcon} iconClassname={STAT_ICON} textClassName={STAT_TEXT} />
            <StatIconPair
              value={formatPopularity(num_scoring_users, popularity)}
              icon={UsersIcon}
              iconClassname={STAT_ICON}
              textClassName={STAT_TEXT}
            />
            <StatIconPair value={formatMediaType(media_type)} icon={FilmIcon} iconClassname={STAT_ICON} textClassName={STAT_TEXT} />
            <StatIconPair value={formatStatus(status)} icon={ClipboardListIcon} iconClassname={STAT_ICON} textClassName={STAT_TEXT} />
            <StatIconPair value={formatNumEpisodes(num_episodes)} icon={FolderIcon} iconClassname={STAT_ICON} textClassName={STAT_TEXT} />
          </ul>
          {genres?.length && (
            <div className="flex gap-y-1 justify-center flex-wrap space-x-3">
              {genres.map(({ name, id }) => (
                <span key={id}>{name}</span>
              ))}
            </div>
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
            <TextClamp text={synopsis}>{<p className="prose prose-slate max-w-none">{synopsis}</p>}</TextClamp>
          </section>
        )}
        <section>
          <h2 className={SUBTITLE}>Info</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2">
            <StatPair label="Studios" value={studios?.map((s) => s.name).join(', ')} />
            <StatPair label="Source" value={formatSource(source)} />
            <StatPair label="Start date" value={start_date} />
            <StatPair label="End date" value={end_date} />
            <StatPair label="Rating" value={formatSnakeCase(rating)?.toUpperCase?.()} />
            <StatPair label="Avg ep duration" value={formatEpisodeDuration(average_episode_duration)} />
          </ul>
        </section>
        {!!related_anime?.length && (
          <section>
            <h2 className={SUBTITLE}>Related</h2>
            <RelatedGrid key={id} items={related_anime} />
          </section>
        )}

        {!!videos.length && (
          <section>
            <h2 className={SUBTITLE}>Videos</h2>
            <VideoGallery key={id} videos={videos} />
          </section>
        )}
        {background && (
          <section>
            <h2 className={SUBTITLE}>Background</h2>
            <TextClamp text={background}>{<p className="prose-lg prose-slate max-w-none">{background}</p>}</TextClamp>
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
            <div className=" max-w-xs mx-auto lg:mx-0">
              <ImageGallery pictures={pictures} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
