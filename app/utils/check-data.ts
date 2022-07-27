import { MyListStatus, Node } from '~/contracts/mal';

export function shouldShowAltTitle({ title, alt }: { title: Node['title']; alt: Node['alternative_titles']['en'] }) {
  return !!alt && alt !== title;
}

type IsStatusArgs = [MyListStatus['status'], MyListStatus['status'] | MyListStatus['status'][]];
export function isStatus(...[status, compare]: IsStatusArgs) {
  const compareArray = [''].concat(compare);

  return compareArray.includes(status);
}

export const isNotStatus = (...args: IsStatusArgs) => !isStatus(...args);
