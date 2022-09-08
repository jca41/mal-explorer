import { AuthState } from '~/contracts/auth';
import { FormListStatus, MyListStatus, Node } from '~/contracts/mal';

import { safeHandleRequest } from './errors';
import { GenericSearchParams, malRequest } from './request';

type DeleteMyListEntry = {
  id: Node['id'];
  accessToken: AuthState['accessToken'];
};
export const deleteMyListEntry = ({ id, accessToken }: DeleteMyListEntry) => {
  return safeHandleRequest(
    malRequest<void>({
      method: 'DELETE',
      path: `/anime/${id}/my_list_status`,
      accessToken,
    })
  );
};

type FormListStatusKeys = keyof FormListStatus;

type EditMyListEntry = {
  id: Node['id'];
  accessToken: AuthState['accessToken'];
} & FormListStatus;

export const editMyListEntry = async ({ id, accessToken, ...data }: EditMyListEntry) => {
  const body = new FormData();

  (Object.keys(data) as FormListStatusKeys[]).forEach((k) => {
    const value = data[k];
    if (k in data && value !== undefined) {
      body.append(k, value.toString?.());
    }
  });

  return safeHandleRequest(
    malRequest<MyListStatus>({
      method: 'PATCH',
      path: `/anime/${id}/my_list_status`,
      body: data as GenericSearchParams,
      accessToken,
    })
  );
};
