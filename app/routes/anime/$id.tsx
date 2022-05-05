import { ClipboardListIcon, FilmIcon, FolderIcon, StarIcon, TrendingUpIcon, UsersIcon } from '@heroicons/react/solid';
import { LinksFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import reactGalleryStyles from 'react-image-gallery/styles/css/image-gallery.css';
import invariant from 'tiny-invariant';

import { GridPreview, GridPreviewItem } from '~/components/grid-preview';
import { ImageGallery, VideoGallery } from '~/components/media-galery';
import { StatIconPair } from '~/components/stat-pair';
import { Node } from '~/contracts/mal';
import { malService } from '~/lib/mal-service.server';
import { formatMediaType, formatNumEpisodes, formatPopularity, formatRank, formatSource, formatStatus } from '~/utils/format-data';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: reactGalleryStyles }];
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(typeof params.id === 'string');

  return malService({
    type: 'detail',
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
        <section className="flex flex-col space-y-2">
          <ul className="flex gap-y-2 justify-center flex-wrap space-x-4">
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
            <div className="flex gap-y-2 justify-center flex-wrap space-x-3">
              {genres.map(({ name, id }) => (
                <span key={id}>{name}</span>
              ))}
            </div>
          )}
        </section>
        <div className="flex justify-center">
          <img src={main_picture.large} alt={title} className="max-w-[70%] sm:max-w-xs" />
        </div>
        <section>
          <p className="prose prose-slate max-w-none">{synopsis || background}</p>
          <ul className="mt-6">
            <li className="flex space-x-2">
              {!!studios.length && (
                <>
                  <span className="font-semibold">Studios:</span>
                  <span>{studios.map((s) => s.name).join(', ')}</span>
                </>
              )}
            </li>
            {!!source && (
              <>
                <li className="flex space-x-2">
                  <span className="font-semibold">Source:</span>
                  <span className="capitalize">{formatSource(source)}</span>
                </li>
              </>
            )}
          </ul>
        </section>
        {!!related_anime?.length && (
          <section>
            <h2 className={SUBTITLE}>Related anime</h2>

            <GridPreview>
              {related_anime.map((r) => (
                <GridPreviewItem key={r.node.id} {...r} />
              ))}
            </GridPreview>
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
        {!!videos.length && (
          <section>
            <h2 className={SUBTITLE}>Videos</h2>
            <VideoGallery key={id} videos={videos} />
          </section>
        )}
        {!!pictures.length && (
          <section>
            <h2 className={SUBTITLE}>Images</h2>
            <div className=" max-w-xs">
              <ImageGallery pictures={pictures} />
            </div>
          </section>
        )}
      </div>

      {/* <div className="flex flex-col space-y-10 mt-10">{JSON.stringify(data)}</div> */}
    </div>
  );
}
