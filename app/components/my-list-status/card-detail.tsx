import { ClockIcon, StarIcon } from '@heroicons/react/solid';

import { ListStatus } from '~/contracts/mal';

import { StatIconBadge } from '../stat-badge';

type CardDetailsProps = { listStatus?: ListStatus };
export function CardDetail({ listStatus }: CardDetailsProps) {
  const score = listStatus?.score;
  if (!score) return null;

  return (
    <div>
      <h3 className="divider my-2 uppercase font-semibold">My list</h3>
      <div className="flex gap-2 flex-wrap">
        <StatIconBadge as="div" value={score} icon={StarIcon} classname="badge-ghost" iconClassname={`text-primary`} />
        {/* {listStatus?.start_date && <StatIconBadge value={`Started: ${listStatus.start_date}`} icon={ClockIcon} classname="badge-ghost" />}
        {listStatus?.finish_date && <StatIconBadge value={`Finished: ${listStatus.finish_date}`} icon={ClockIcon} classname="badge-ghost" />} */}
      </div>
    </div>
  );
}
