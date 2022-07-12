import { AuthState } from '~/contracts/auth';

export function getAuthHeaders(accessToken?: AuthState['accessToken']): Record<string, string | never> {
  if (!accessToken) return {};

  return {
    Authorization: `Bearer ${accessToken}`,
  };
}
