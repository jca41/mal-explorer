import numeral from 'numeral';

import { MediaType, SimpleDateString, Status } from '~/contracts/mal';

import { formatSnakeCase } from './primitives';

const STATUS_MAP: Record<Status, string> = {
  finished_airing: 'Finished',
  not_yet_aired: 'Not Aired',
  currently_airing: 'Airing',
};

const formatMissing = (s: string) => `missing -> ${s}`;

export function formatStatus(status: Status) {
  return STATUS_MAP[status] ?? formatMissing(status);
}

const MEDIA_TYPE_MAP: Partial<Record<MediaType, string>> = {
  tv: 'TV',
  ova: 'OVA',
  ona: 'ONA',
};

export function formatMediaType(mediaType: MediaType) {
  return MEDIA_TYPE_MAP[mediaType] ?? formatSnakeCase(mediaType);
}

export function formatRank(rank: number) {
  return rank ?? '';
}

export function formatNumEpisodes(numEpisodes: number) {
  return numEpisodes > 1 ? `${numEpisodes} Ep` : '';
}

export function formatPopularity(numListUsers: number, popularity: number) {
  const formattedNumListUsers = numListUsers > 100 ? numeral(numListUsers).format('0.0a') : '<100';
  return popularity ? `${formatRank(popularity)} (${formattedNumListUsers})` : '';
}

export function formatEpisodeDuration(durationInSeconds: number | undefined) {
  if (!durationInSeconds) return null;

  return `${Math.floor(durationInSeconds / 60)}m`;
}

export function formatStartAndEndDate(date?: SimpleDateString) {
  if (!date) return null;
  return date.split('-').reverse().join('/');
}
