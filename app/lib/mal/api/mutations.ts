import { AuthState } from '~/contracts/auth';
import { Node } from '~/contracts/mal';

import { malRequest } from './request';

type DeleteMyListEntry = {
  id: Node['id'];
  accessToken: AuthState['accessToken'];
};
export const deleteMyListEntry = ({ id, accessToken }: DeleteMyListEntry) => {
  return malRequest<void>({
    method: 'DELETE',
    path: `/anime/${id}/my_list_status`,
    accessToken,
  });
};
