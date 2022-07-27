import { MyListStatus, Node } from '~/contracts/mal';

export type MyListStatusProps = {
  myListStatus?: MyListStatus;
  numEpisodes: Node['num_episodes'];
};
