import { MediaType, Status } from '~/contracts/mal';

const STATUS_MAP: Record<Status, string> = {
  finished_airing: 'Finished',
  not_yet_aired: 'Not Aired',
};
export function formatStatus(status: Status) {
  return STATUS_MAP[status];
}

const MEDIA_TYPE_MAP: Record<MediaType, string> = {
  movie: 'Movie',
  tv: 'TV',
  ova: 'OVA',
  special: 'Special',
};
export function formatMediaType(mediaType: MediaType) {
  return MEDIA_TYPE_MAP[mediaType];
}
