import { MediaType, Status } from '~/contracts/mal';

const STATUS_MAP: Record<Status, string> = {
  finished_airing: 'Finished',
  not_yet_aired: 'Not Aired',
};

const MISSING = 'MISSING_MAPPING';

export function formatStatus(status: Status) {
  return STATUS_MAP[status] ?? MISSING;
}

const MEDIA_TYPE_MAP: Record<MediaType, string> = {
  movie: 'Movie',
  tv: 'TV',
  ova: 'OVA',
  ona: 'ONA',
  special: 'Special',
  music: 'Music',
};
export function formatMediaType(mediaType: MediaType) {
  return MEDIA_TYPE_MAP[mediaType] ?? MISSING;
}

export function formatRank(rank: number) {
  return rank ? `#${rank}` : '';
}
