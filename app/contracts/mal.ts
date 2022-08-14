export type MediaType = 'movie' | 'tv' | 'special' | 'ova' | 'ona' | 'music';
export type Status = 'finished_airing' | 'not_yet_aired' | 'currently_airing';
export type Rating = 'pg_13';
export type Source = 'manga' | 'web_manga' | 'original' | 'light_novel';
export type Picture = {
  medium: string;
  large: string;
};
export type RelationType = 'sequel' | 'prequel' | 'other' | 'alternative_version' | 'character' | 'side_story' | 'summary' | 'parent_story';
export type RelatedAnime = {
  node: Pick<Node, 'id' | 'title' | 'main_picture' | 'mean'>;
  relation_type: RelationType;
  relation_type_formatted: Uppercase<RelationType>;
};
export type SimpleDateString = `${number}-${number}-${number}`;
export type Recommendation = {
  node: Pick<Node, 'id' | 'title' | 'main_picture' | 'mean'>;
  num_recommendations: number;
};
export type Statistics = {
  status: {
    watching: string;
    completed: string;
    on_hold: string;
    dropped: string;
    plan_to_watch: string;
  };
  num_list_users: number;
};

export type Video = {
  id: number;
  title: string;
  url: string;
  created_at: number;
  updated_at: number;
  thumbnail: string;
};

export type MyListStatus = {
  is_rewatching: boolean; // only used to reset num_episodes_watched
  num_episodes_watched: number;
  score: number;
  status: 'completed' | 'plan_to_watch' | 'watching' | 'on_hold' | 'dropped';
  priority: 0 | 1 | 2;
  updated_at: string;
  start_date?: string;
  finish_date?: string;
  comments: string;
  rewatch_value: number;
  num_times_rewatched: number;
};

export type Node = {
  id: number;
  title: string;
  main_picture?: Picture;
  alternative_titles: {
    synonyms: string[];
    en?: string;
    ja?: string;
  };
  start_date?: SimpleDateString;
  end_date?: SimpleDateString;
  synopsis: string;
  mean: number;
  rank: number;
  popularity: number;
  num_list_users: number;
  num_scoring_users: number;
  nsfw: string;
  created_at: string;
  updated_at: string;
  media_type: MediaType;
  status: Status;
  genres: { id: number; name: string }[];
  num_episodes: number;
  start_season?: {
    year: number;
    season: string;
  };
  source: Source;
  average_episode_duration: number;
  rating: Rating;
  studios: { id: number; name: string }[];
  broadcast: {
    day_of_the_week: string;
    start_time: string;
  };
  pictures: Picture[];
  background: string;
  related_anime: RelatedAnime[];
  recommendations: Recommendation[];
  statistics: Statistics;
  videos: Video[];
  my_list_status?: MyListStatus;
};

export type Paging = {
  previous?: string;
  next?: string;
};

export type NodeList = {
  data?: { node: Node }[];
  paging?: Paging;
};

export type Error = {
  error: string;
  message: string;
};

// API params

export type RankingTypeParam = 'all' | 'airing' | 'upcoming' | 'tv' | 'ova' | 'movie' | 'special' | 'bypopularity' | 'favorite';
export type SeasonParam = 'winter' | 'spring' | 'summer' | 'fall';
export type SeasonalSortQueryParam = 'anime_score' | 'anime_num_list_users';
export type MyListSortQueryParam = 'list_score' | 'list_updated_at' | 'anime_title' | 'anime_start_date';
