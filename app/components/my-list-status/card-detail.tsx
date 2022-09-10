import { StarIcon } from '@heroicons/react/solid';

import { ListStatus } from '~/contracts/mal';

import { StatIconBadge } from '../stat-badge';

type CardDetailsProps = { listStatus?: ListStatus };
export function CardDetail({ listStatus }: CardDetailsProps) {
  const score = listStatus?.score;
  if (!score) return null;

  return (
    <div>
      <h3 className="divider my-2 font-semibold uppercase">My list</h3>
      <div className="flex flex-wrap gap-2">
        <StatIconBadge as="div" value={score} icon={StarIcon} classname="badge-ghost" iconClassname={`text-primary`} />
      </div>
    </div>
  );
}
