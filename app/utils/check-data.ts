import { Node } from '~/contracts/mal';

export function shouldShowAltTitle({ title, alt }: { title: Node['title']; alt: Node['alternative_titles']['en'] }) {
  return !!alt && alt !== title;
}
