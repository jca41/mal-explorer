import { Node } from '~/contracts/mal';

import { malRequest } from './request';

type DeleteMyListEntry = {
  id: Node['id'];
};
export const deleteMyListEntry = ({ id }: DeleteMyListEntry) => {
  return malRequest<void>({
    method: 'DELETE',
    path: `anime/${id}/my_list_status`,
  });
};
