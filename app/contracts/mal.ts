export type MediaType = 'movie' | 'tv' | 'special' | 'ova' | 'ona';
export type Status = 'finished_airing' | 'not_yet_aired';
export type Rating = 'pg_13';
export type Picture = {
  medium: string;
  large: string;
};
export type RelationType = 'sequel' | 'prequel' | 'other';
export type RelatedAnime = {
  node: Pick<Node, 'id' | 'title' | 'main_picture'>;
  relation_type: RelationType;
  relation_type_formatted: Uppercase<RelationType>;
};
export type Recommendation = {
  node: Pick<Node, 'id' | 'title' | 'main_picture'>;
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

export type Node = {
  id: number;
  title: string;
  main_picture: Picture;
  alternative_titles: {
    synonyms: string[];
    en: string;
    ja: string;
  };
  start_date?: string;
  end_date?: string;
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
  start_season: {
    year: number;
    season: string;
  };
  source: string;
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
