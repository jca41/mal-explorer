export type MalError = {
  message?: string;
  error: string;
};

export const isMalError = (d: object): d is MalError => 'error' in d;

export async function safeHandleRequest<T>(p: Promise<T | MalError>): Promise<T | MalError> {
  try {
    return p;
  } catch (e) {
    const handled: MalError = { error: 'Error', message: (e as Error).message };
    return handled;
  }
}
