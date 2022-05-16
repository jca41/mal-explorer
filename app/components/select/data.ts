import { RankingTypeParam, SeasonParam } from '~/contracts/mal';

export const RANKING_TYPES_OPTIONS: Record<RankingTypeParam, string> = {
  all: 'Rating',
  bypopularity: 'Popularity',
  airing: 'Airing',
  movie: 'Movie',
  tv: 'TV',
  upcoming: 'Upcoming',
  favorite: 'Favorite',
  ova: 'OVA',
  special: 'Special',
};

const currentYear = new Date().getFullYear();

export const SEASONAL_YEAR_OPTIONS: Record<number, string> = [currentYear - 1, currentYear, currentYear + 1].reduce(
  (acc, v) => ({
    ...acc,
    [v]: v,
  }),
  {}
);

export const SEASONAL_SEASON_OPTIONS: Record<SeasonParam, string> = {
  winter: 'Winter',
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
};
